const constants = require('./constants');

let stats = {};

function createNewStat(duration) {
  return {
    samples: [duration],
    min: duration,
    max: duration,
    sum: duration,
    avg: duration
  }
}

// add new stats record
function push(funcName, duration) {
  // first call for specified function
  if (!stats[funcName]) {
    stats[funcName] = createNewStat(duration);
    return;
  }

  const fStat = stats[funcName];
  fStat.samples.push(duration);

  if (duration < fStat.min) fStat.min = duration;
  if (duration > fStat.max) fStat.max = duration;
  fStat.sum += duration;
  fStat.avg = fStat.sum / fStat.samples.length;

  stats[funcName] = fStat;
}

function reset() {
  stats = {};
}

function changeUnits(from, to) {
  const toNS = constants[from.toUpperCase() + '_TO_NS'];
  const toUnits = constants['NS_TO_' + to.toUpperCase()];
  const convertRatio = toNS * toUnits;

  Object.keys(stats).forEach(key => {
    stats[key].samples.forEach((s, i, arr) => arr[i] = s * convertRatio);
    stats[key].min = stats[key].min * convertRatio;
    stats[key].max = stats[key].max * convertRatio;
    stats[key].sum = stats[key].sum * convertRatio;
    stats[key].avg = stats[key].avg * convertRatio;
  });
}

module.exports = {
  get: () => stats,
  push: push,
  reset: reset,
  changeUnits: changeUnits
};