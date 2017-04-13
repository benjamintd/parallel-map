'use strict';

var path = require('path');
var f = require(path.resolve(process.cwd(), process.argv[2]));

process.on('message', function (message) {
  var r = message.data.map(f);
  process.send({
    data: r,
    jobId: message.jobId
  });
  process.exit(0);
});
