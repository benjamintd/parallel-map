'use strict';

const os = require('os');
const path = require('path');
const chunk = require('lodash.chunk');
const flatten = require('lodash.flatten');
const fork = require('child_process').fork;

module.exports = function (data, file) {
  let workers = [];
  let results = [];
  let doneJobsCount = 0;

  const cpuCount = os.cpus().length;

  function appendResults(r) {
    results[r.jobId] = r.data;
    doneJobsCount += 1;
  }

  const chunks = chunk(data, Math.ceil(data.length / cpuCount));
  const jobsCount = chunks.length;

  for (let i = 0, n = chunks.length; i < n; i++) {
    let worker = fork(path.join(__dirname, 'worker.js'), [file]);
    worker.on('message', appendResults);
    workers.push(worker);

    let c = chunks[i];

    worker.send({
      data: c,
      jobId: i
    });
  }

  return new Promise((resolve) => {
    setInterval(function () {
      if (doneJobsCount === jobsCount) {
        resolve(flatten(results));
        clearInterval(this);
      }
    }, 0);
  });
};
