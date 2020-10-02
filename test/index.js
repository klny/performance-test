const performance = require('../');
const sleep = require('./utils').sleep;

const logSleep = performance.log(sleep);
const statSleep = performance.stat(require('./utils').sleep);
const statNumStr = performance.stat(require('./utils').numStr);
const statFib = performance.stat(require('./utils').fib);

async function test() {
  console.log('starting test\n');

  console.log('verify name');
  console.log('logSleep function name (should be sleep): ' + logSleep.name);

  console.log('\n\nlogging sleep:');
  await logSleep(20);
  await logSleep(50);
  await logSleep(70);


  console.log('\n\ngetting stats of sleep as object:');
  for (let i = 0; i < 10; i++) {
    await statSleep(i*20);
  }
  console.log(JSON.stringify(performance.getStats()));
  console.log('\nlogging statistics as table:');
  performance.logStats();


  performance.resetStats();
  console.log('getting stats:');
  for (let i = 0; i < 10; i++) {
    await statSleep(i*30);
    await statNumStr(i*37915);
    await statFib(i+30);
  }
  performance.logStats();


  console.log('\n\nreconfiguring:')
  performance.configure({
    statTableName: 'Performance Table',
    units: 'us',
    decimalPlaces: 3
  });
  performance.logStats();

  console.log('\n\n\ntest finished');
}


module.exports = test();