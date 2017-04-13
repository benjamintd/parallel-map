'use strict';

var path = require('path');
var parallelMap = require('../index.js');
var fibonacci = require('./fixtures/fibo.js');

var d = [];
for (var i = 0; i < 20000; i++) {
  d.push(25);
}

var startTime = new Date();

parallelMap(d, path.join(__dirname, 'fixtures/fibo.js'))
  .then(() => {
    console.log('parallel: ', new Date() - startTime);

    startTime = new Date();

    d.map(fibonacci);

    console.log('regular: ', new Date() - startTime);

  });
