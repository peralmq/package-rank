var calculate = require('./calculate.js'),
    data = require('./data.json'),
    format = require('./format.js'),
    moment = require('moment'),
    should = require('should');

var today = moment('2014-06-06');

describe('Format results', function() {
  it('should parse data from registry.npmjs.org', function() {
    var actual = format.packageName(data.registrynpmjs);
    should(actual).equal('tgriesser/knex');
  });

  it('should parse data from npmjs.org and github.com', function() {
    var actual = format.metrics([data.apinpmjs, data.github], today);
    should(actual.downloadsLastDay).equal(922);
    should(actual.downloadsLastWeek).equal(4630);
    should(actual.downloadsLastMonth).equal(20703);
    should(actual.starCount).equal(453);
    should(actual.watchCount).equal(34);
    should(actual.daysSinceLastCommit).equal(0);
  });
});

describe('Calculate score', function() {
  it('should calculate a score based on data', function() {
    var actual = calculate({
      downloadsLastDay: 922,
      downloadsLastWeek: 4630,
      downloadsLastMonth: 20703,
      starCount: 453,
      watchCount: 34,
      daysSinceLastCommit: 0
    }, today);
    should(actual).equal(73);
  });
});
