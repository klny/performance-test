function sleep(ms) {
  return new Promise(exec => setTimeout(exec, ms));
}

function numStr(x) {
  let str = '';
  for (let i = 0; i < x; i++) {
    str += i;
  }

  return str;
}

// expensive fibonacci function
function fib(x) {
  if (x <= 1) return x;
  return fib(x - 1) + fib(x - 2);
}

module.exports = {
  sleep: sleep,
  numStr: numStr,
  fib: fib
};