const wrap = require('@klny/function-wrapper');

const config = require('./src/config');
const logger = require('./src/logger');
const stats = require('./src/stats');
const utils = require('./src/utils');

function log(func, enabled, cond) {
  return wrap(func, () => utils.getActTime(), (beforeResult, args) => {
    const duration = utils.getDuration(beforeResult);
    logger.logFuncDuration(func.name, args, duration);
  }, cond);
}

function stat(func, enabled, cond) {
  return wrap(func, () => utils.getActTime(), (beforeResult, args) => {
    const duration = utils.getDuration(beforeResult);
    stats.push(func.name, duration);
  }, cond);
}

function logAndStat(func, enabled, cond) {
  return wrap(func, () => utils.getActTime(), (beforeResult, args) => {
    const duration = utils.getDuration(beforeResult);
    logger.logFuncDuration(func.name, args, duration);
    stats.push(func.name, duration);
  }, cond);
}

module.exports = {
  configure: config.configure,
  log: log,
  stat: stat,
  logAndStat: logAndStat,
  getStats: stats.get,
  logStats: logger.logStats,
  resetStats: stats.reset
};