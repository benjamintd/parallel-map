'use strict';

var test = require('tap').test;
var path = require('path');
var parallelMap = require('../index');

test('it works', function (t) {
  var d = [1, 2, 3, 4, 5, 6, 7];
  parallelMap(d, path.join(__dirname, 'fixtures/fibo.js'))
    .then(data => {
      t.same(data, [1, 1, 2, 3, 5, 8, 13]);
      t.end();
    });
});

test('empty array', function (t) {
  var d = [];
  parallelMap(d, path.join(__dirname, 'fixtures/fibo.js'))
    .then(data => {
      t.same(data, []);
      t.end();
    });
});
