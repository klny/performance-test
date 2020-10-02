const config = require('./config');
const constants = require('./constants');

function getActTime() {
  if (config.isNodeEnv) return process.hrtime();
  return Date.now();
}

function getDuration(from) {
  let ns;

  if (config.isNodeEnv) {
    const diff = process.hrtime(from);
    ns = diff[0] * constants.S_TO_NS + diff[1];
  } else {
    ns = (Date.now() - from) * constants.MS_TO_NS;
  }

  // return duration in nanoseconds
  if (config.units === 'ns') return ns;

  // return duration in microseconds
  if (config.units === 'us') return ns * constants.NS_TO_US;

  // return duration in seconds
  if (config.units === 's') return ns * constants.NS_TO_S;

  // duration in milliseconds (default)
  return ns * constants.NS_TO_MS;
}

function round(num) {
  if (!num || isNaN(num)) return null;
  return num.toFixed(config.decimalPlaces);
}

module.exports = {
  getActTime: getActTime,
  getDuration: getDuration,
  round: round
};