var calculate = require('./calculate.js'),
    format = require('./format.js'),
    Q = require('q'),
    requestp = require('./requestp.js');

module.exports = (function(packageName, VERBOSE) {
  function formatResult(result) {
    if (VERBOSE) {
      result.githubRepo = this.githubRepo;
      result.npmPackage = packageName;
      return result;
    } else {
      return result.rank;
    }
  }

  function fetchMetrics(githubRepo) {
    this.githubRepo = githubRepo;
    return Q.all([
      requestp('https://api.npmjs.org/downloads/range/last-month/' + packageName),
      requestp('https://api.github.com/repos/' + githubRepo)
    ])
      .then(format.metrics);
  }

  function fetchGithubRepo() {
    return requestp('https://registry.npmjs.org/' + packageName)
      .then(format.githubRepo);
  }

  return fetchGithubRepo()
    .then(fetchMetrics)
    .then(calculate)
    .then(formatResult);
});
