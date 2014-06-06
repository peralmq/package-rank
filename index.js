var calculate = require('./calculate.js'),
    format = require('./format.js'),
    Q = require('q'),
    requestp = require('./requestp');

function printAndQuit(result) {
  console.log(result);
  process.exit();
}

function fetchMetrics(githubRepo) {
  return Q.all([
    requestp('https://api.npmjs.org/downloads/range/last-day/' + packageName),
    requestp('https://api.github.com/repos/' + githubRepo)
  ]);
}

function fetchPackageInformation() {
  return requestp('https://registry.npmjs.org/' + packageName);
}

var packageName = process.argv[2];
fetchPackageInformation()
  .then(format.packageName)
  .then(fetchMetrics)
  .then(format.metrics)
  .then(calculate, printAndQuit)
  .then(printAndQuit)
  .done();
