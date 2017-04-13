'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var path = require('path');
var parallelMap = require('../index.js');
var fibonacci = require('./fixtures/fibo.js');

var d = [];
for (var i = 0; i < 1000; i++) {
  d.push(Math.random() * 50);
}

suite
  .add('parallel map', {
    defer: true,
    fn: function (p) {
      parallelMap(d, path.join(__dirname, 'fixtures/fibo.js'))
        .then(() => p.resolve());
    }
  })
  .add('regular map', function () {
    d.map(fibonacci);
  })
  .on('complete', function () {
    console.log(this[0].stats);
  })
  .run({'async': true});
