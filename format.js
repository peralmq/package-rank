var moment = require('moment'),
  _ = require('underscore');

function sumDownloads(downloadRange, start, end) {
  function inRange(download) {
    return (
      moment(download.day).diff(start, 'days') >= 0 &&
      moment(download.day).diff(end, 'days') < 0
    );
  }

  return _
    .chain(downloadRange)
    .filter(inRange)
    .map(function(d) {
      return d.downloads;
    })
    .reduce(function(a, b) {
      return a + b;
    })
    .value();
}

module.exports = {
  metrics: function(results, today) {
    var npm = results[0],
      github = results[1];
    today = today || moment();

    return {
      downloadsLastDay: sumDownloads(npm.downloads, today.clone().add('days', -1), today),
      downloadsLastWeek: sumDownloads(npm.downloads, today.clone().add('days', -7), today),
      downloadsLastMonth: sumDownloads(npm.downloads, today.clone().add('months', -1), today),
      starCount: github.stargazers_count,
      watchCount: github.subscribers_count,
      daysSinceLastCommit: moment(github.updated_at).diff(today, 'days'),
    };
  },
  packageName: function(result) {
    var repository = result.repository;
    if (!repository.url.match(/github/)) throw ('Only github supported');
    return repository.url.match(/github.com\/(.+).git/)[1];
  }
};
