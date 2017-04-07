'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cfenv = require('cfenv'); // cloud foundry environment variables
var forceHttps = require('../middleware/forceHttps');
var handleBarsInstance = require('./handlebars');

/**
 * Routers.
 */
var apiRouter = require('../routers/apiRouter');
var jsonRouter = require('../routers/jsonRouter');
var staticPageRouter = require('../routers/staticPageRouter');

/**
 * Connect to database.
 */
require('./database');

/**
 * Create Express server.
 */
var expressApp = express();

/**
 * Force https when not localhost
 */
if (!cfenv.getAppEnv().isLocal) {
  expressApp.use(forceHttps);
}

/**
 * Use helmet for security
 */
expressApp.use(helmet());

/**
 * Body parser
 */
expressApp.use(bodyParser.urlencoded({extended: false})); // application/x-www-form-urlencoded
expressApp.use(bodyParser.json()); // parse application/json

/**
 * Express Validator.
 * Must be set directly after body parser
 */
expressApp.use(expressValidator());

/**
 * Configure express app to use handlebars.
 * Set the file name to use & the location of the views
 */
expressApp.engine('handlebars', handleBarsInstance.engine);
expressApp.set('view engine', 'handlebars'); // .handlebar filename
expressApp.set('views', path.join(__dirname, '/../views'));

// prevents express setting x-powered-by header
expressApp.disable('x-powered-by');

/**
 * use compression
 */
expressApp.use(compression());

// // log all paths
// expressApp.use(function(req, res, next) {
//   console.log(req.path);
//   next();
// });

// Define static assets path - i.e. styles, scripts etc.
expressApp.use('/', express.static(path.join(__dirname + '/../../../build/')));

/**
 * Define routes.
 */
expressApp.use('/api', apiRouter);
expressApp.use('/json', jsonRouter);
expressApp.use('/', staticPageRouter);

/**
 * Start Express server.
 */
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
