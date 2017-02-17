'use strict';

var server = require('./server/src/core/server');

// Start the server
server.startServer(process.env.PORT);
