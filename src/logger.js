const table = require('@klny/text-table');
const config = require('./config');
const utils = require('./utils');
const stats = require('./stats');

// get string from function arguments
function getArgStr(args) {
  if (!args) return '';
  return Object.values(args);
}

// get duration rounded to configured decimal places
function getDurationStr(duration) {
  return utils.round(duration);
}

// log function duration using configured template with replaced placeholders
function logFuncDuration(funcName, args, duration) {
  let str = config.log;
  str = str.replace('${function}', funcName);
  str = str.replace('${arguments}', getArgStr(args));
  str = str.replace('${duration}', getDurationStr(duration));
  str = str.replace('${units}', config.units);

  config.logFunction(str);
}

// log function duration statistics as text table
function logStats() {
  const tbl = table(config.statTableName, stats.get(), config.units);
  config.logFunction(tbl);
}

module.exports = {
  logFuncDuration: logFuncDuration,
  logStats: logStats
};