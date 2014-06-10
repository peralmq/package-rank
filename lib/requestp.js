var Promise = require('promise'),
    request = require('request');

// https://coderwall.com/p/9cifuw
module.exports = function (url) {
  var options = {
    url: url,
    headers: {
      'User-Agent': 'npm-score-cli'
    },
    json: true
  };
  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      if (err) {
        return reject(err);
      } else if (res.statusCode !== 200) {
        err = new Error("Unexpected status code: " + res.statusCode);
        err.res = res;
        return reject(err);
      }
      resolve(body);
    });
  });
};
