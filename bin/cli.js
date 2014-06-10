var pr = require('../lib/');
var args = require('minimist')(process.argv.slice(2));

if (typeof args._ == "undefined" || args._ === null || args._.length === 0) {
  console.log('Usage: package-rank [-v] <package name>');
  process.exit();
}

var packageName = args._[0],
    VERBOSE = args.hasOwnProperty('v');
pr(packageName, VERBOSE)
  .then(console.log)
  .done();
