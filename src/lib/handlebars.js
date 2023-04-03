const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
  //te indica el timepo que paso desde que existe
  return format(timestamp);
}

module.exports = helpers;