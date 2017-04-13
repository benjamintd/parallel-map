# Parallel Map

A map function that runs on all of your CPU cores, for Node.js.

This is meant to be used with synchronous, CPU intensive function to be mapped on large arrays. `parallel-map` will split the load across all available CPUs.

## Install

```sh
$ npm install --save parallel-map
```

## Usage

`parallel-map` is asynchronous and returns a Promise. The use of forked processes necessitates that the called function resides in its own file, which should be a Node module that exports a single function.

main.js:
```js
var parallelMap = require('parallel-map');
var path = require('path');

parallelMap([1, 2, 3, 4, 5], path.join(__dirname, 'function.js'))
  .then((results) => {
    console.log(results);
    // [1, 4, 9, 16, 25]
  });
```

function.js:
```js
module.exports = function (x) {
  return x * x;
}
```
