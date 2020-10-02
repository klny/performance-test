# performance-test
Log performance and create performance statistics of JS functions.

## Usage
Import package for example as "performance". 

##### Package contains three methods test function performance 
###### Functions are wrapped seamlessly with no impact on rest of your code
```js
const performance = require('@klny/performance-test');

const logFunc = performance.log(func);                // logs wrapped function duration
const statFunc = performance.stat(func);              // creates/recalculates statistics on execution
const logAndStatFunc = performance.logAndStat(func);  // both of previous combined 
```

##### Wrap function in module exports to log/get statistics on every execution
```js
module.exports = {
  yourFunction: performance.log(yourFunction),                 // logs duration on every execution
  yourOtherFunction: performance.stat(yourOtherFunction),      // writes statistics on every execution
  yourLastFunction: performance.logAndStat(yourLastFunction),  // logs and writes statistics on every execution
}
```

##### To access statistics use following methods
```js
performance.getStats();    // return statistics as object
performance.logStats();    // logs statistics as text table
performance.resetStats();  // resets all statistics
```

##### There are two optional arguments to control functionality
 * enabled - wrap-time switch to enable/disable testing
 * cond - execution-time condition to test only if condition is met

```js
// enable wrapping only in development
const logFunc = performance.log(func, process.env === 'DEVELOPMENT'); 

// always wrap but log/create stats only if first function argument is > 10
const logFunc2 = performance.log(func, true, (args) => args[0] > 10);  
``` 

## Examples
##### Log function duration  
```js
const performance = require('@klny/performance-test');
const sleep = require('./utils').sleep;

// use log wrapper to log duration of sleep function
const logSleep = performance.log(sleep);

console.log('logging sleep:');
await logSleep(20);
await logSleep(50);
await logSleep(70);
```
```sh
logging sleep:
 - performance test: function sleep(20) [22.533500 ms]
 - performance test: function sleep(50) [50.854300 ms]
 - performance test: function sleep(70) [69.862901 ms]
```

##### Create statistics
```js
const performance = require('@klny/performance-test');
const statSleep = performance.stat(require('./utils').sleep);
const statNumStr = performance.stat(require('./utils').numStr);
const statFib = performance.stat(require('./utils').fib);

performance.resetStats();
console.log('getting stats:');
for (let i = 0; i < 10; i++) {
  await statSleep(i*30);
  await statNumStr(i*37915);
  await statFib(i+30);
}
performance.logStats();
```
```sh
getting stats:

                          --- PERFORMANCE STATS ---

        | samples |     min    |     max    |     sum     |     avg
-----------------------------------------------------------------------------
 sleep  |      10 |   0.095001 | 270.326800 | 1350.685503 | 135.068550   [ms]
 numStr |      10 |   0.075399 |  60.670800 |  295.646498 |  29.564650   [ms]
 fib    |      10 |  11.464100 | 613.152900 | 1610.805801 | 161.080580   [ms]
```


## Configuration
Default configuration is a JS object:  
```js
const config = {
  isNodeEnv: undefined,
  units: 'ms',
  statTableName: '--- PERFORMANCE STATS ---',
  decimalPlaces: 6,
  logFunction: console.log,
  log: ' - performance test: function ${function}(${arguments}) [${duration} ${units}]'
};
```
 * isNodeEnv - boolean signalizing node env - uses process.hrtime() for current time if true, Date() otherwise
 * units - units for duration calculation ['s', 'ms', 'us', 'ns']
 * statTableName - name of table with statistics, provide empty string to skip
 * decimalPlaces - number of decimal places for rounding numbers
 * logFunction - your logger function to use, e.g. console.log or winston logger
 * log - log string formatter, use provided placeholders for dynamic values 


#### Use "configure" method to change configuration.  
Specify any or all configuration keys. Default values will be used for missing keys.
```js
const performance = require('@klny/performance-test');

performance.configure({
  statTableName: 'Performance Table',
  units: 'us',
  decimalPlaces: 3
});

performance.logStats();
```
```sh
                              Performance Table

        | samples |    min    |     max    |     sum     |     avg
----------------------------------------------------------------------------
 sleep  |      10 |    95.001 | 270326.800 | 1350685.503 | 135068.550   [us]
 numStr |      10 |    75.399 |  60670.800 |  295646.498 |  29564.650   [us]
 fib    |      10 | 11464.100 | 613152.900 | 1610805.801 | 161080.580   [us]
```

## Features
 * seamless function wrapping
 * no impact on existing application
 * sync/async function support
 * wrap-time and execution-time control
 * statistics visualization
 * access to statistics object
 * configurable logging function 

## Installation
```bash
$ npm install @klny/performance-test
```

## License

  [MIT](LICENSE)