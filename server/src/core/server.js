'use strict';

var path = require('path');
var express = require('express');
var compression = require('compression');
var cfenv = require('cfenv'); // cloud foundry environment variables
var forceHttps = require('../middleware/forceHttps');
var handleBarsInstance = require('./handlebars');

// routers
var apiRouter = require('../routers/apiRouter');
var staticPageRouter = require('../routers/staticPageRouter');

// initiate database connection
require('./database');

var expressApp = express();

// Set up the use of handle bars and set the path for views and layouts
expressApp.set('views', path.join(__dirname, '/../views'));
expressApp.engine('handlebars', handleBarsInstance.engine);
expressApp.set('view engine', 'handlebars');

// prevents express setting x-powered-by header
expressApp.disable('x-powered-by');

// use compression
expressApp.use(compression());

// // log all paths
// expressApp.use(function(req, res, next) {
//   console.log(req.path);
//   next();
// });

// force https on Bluemix
if (!cfenv.getAppEnv().isLocal) {
  expressApp.use(forceHttps);
}

// Define static assets path - i.e. styles, scripts etc.
expressApp.use('/', express.static(path.join(__dirname + '/../../../build/')));

// Define routes
expressApp.use('/api', apiRouter);
expressApp.use('/', staticPageRouter);

var serverController = {};
serverController.startServer = function(port) {
  // As a failsafe use port 0 if the input isn't defined
  // this will result in a random port being assigned
  // See : https://nodejs.org/api/http.html for details
  if (
    typeof port === 'undefined' ||
    port === null ||
    isNaN(parseInt(port, 10))
  ) {
    port = 0;
  }

  var server = expressApp.listen(port, () => {
    var serverPort = server.address().port;
    console.log('Server running on port ' + serverPort);
  });
};

module.exports = serverController;
