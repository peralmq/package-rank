var moment = require('moment');
module.exports = function(data, today) {
  today = today || moment();
  var dayDiffMonth = today.diff(today.clone().add('months', -1), 'days');
  var downloads =  (
    data.downloadsLastDay +
    (data.downloadsLastWeek / 7) +
    (data.downloadsLastMonth / dayDiffMonth)
  ) / 3;
  var daysSinceLastCommit = Math.min(data.daysSinceLastCommit, 200);
  data.rank = parseInt(
    0.05 * downloads +
    0.05 * data.starCount +
    0.4  * data.watchCount -
    0.1  * daysSinceLastCommit
  );
  return data;
};
