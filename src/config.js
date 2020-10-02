const table = require('@klny/text-table');
const stats = require('./stats');

const config = {
  isNodeEnv: undefined,
  units: 'ms',
  statTableName: '--- PERFORMANCE STATS ---',
  decimalPlaces: 6,
  logFunction: console.log,
  log: ' - performance test: function ${function}(${arguments}) [${duration} ${units}]'
};

const allowedUnits = ['s', 'ms', 'us', 'ns'];

function configure(cnf) {
  if (!cnf) return;

  if (cnf.isNodeEnv) {
    if (cnf.isNodeEnv === true || cnf.isNodeEnv === false) config.isNodeEnv = cnf.isNodeEnv;
  }

  if (cnf.units) {
    if (allowedUnits.includes(cnf.units)) {
      stats.changeUnits(config.units, cnf.units);
      config.units = cnf.units;
    }
  }

  if (cnf.statTableName) {
    config.statTableName = cnf.statTableName;
  }

  if (cnf.decimalPlaces) {
    if (Number.isInteger(cnf.decimalPlaces)) {
      config.decimalPlaces = cnf.decimalPlaces;
      table.configure({ decimalPlaces: cnf.decimalPlaces });
    }
  }

  if (cnf.logFunction) {
    config.logFunction = cnf.logFunction;
  }

  if (cnf.log) {
    config.log = cnf.log;
  }
}

// check environment on include
if (config.isNodeEnv === undefined && process && process.hrtime()) config.isNodeEnv = true;
table.configure({ decimalPlaces: config.decimalPlaces });

module.exports = config;
module.exports.configure = configure;