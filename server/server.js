'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TMPDIR = './' || '/tmp';
var config = require('./config/env/' + process.env.NODE_ENV),
serverport = process.env.PORT || 5000;
    var fs = require('fs');

    var https = require('https');

module.exports = function(server) {
  // In the if condition the the environment will be checked and server will start accordingly
  // Start server

  if ((process.env.NODE_ENV !== 'test') && (process.env.NODE_ENV !==
    'development')) {
  server.listen(serverport, function() {
    console.log('Express server listening on port %d in %s mode', serverport,
      server.get('env'));
  });
  } else {
    // Expose app
    exports = module.exports = server;
    var pk = fs.readFileSync('./server/certs/server.key');
    var pc = fs.readFileSync('./server/certs/server.crt');
    var opts = {
      key: pk,
      cert: pc
    };

    https.createServer(opts, server).listen(443, function() {
      console.log('Express https server listening on port %d in %s mode',
        443, server.get('env'));
    });
  }
};
