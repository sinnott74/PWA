'use strict';

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
// cfenv provides access to your Cloud Foundry environment https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// routers
var apiRouter = require('../routers/api-router');
var pageRouter = require('../routers/page-router');

// initiate database connection
// require('./database');

function ServerController() {
  var expressApp = express();
  var handleBarsInstance = exphbs.create({
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, '/../views/layouts'),
    partialsDir: path.join(__dirname, '/../views/partials')
  });

  // Set up the use of handle bars and set the path for views and layouts
  expressApp.set('views', path.join(__dirname, '/../views'));
  expressApp.engine('handlebars', handleBarsInstance.engine);
  expressApp.set('view engine', 'handlebars');

  // use compression
  expressApp.use(compression());

  // log all paths
  expressApp.use(function(req, res, next) {
    console.log(req.path);
    next();
  });

  // Define static assets path - i.e. styles, scripts etc.
  expressApp.use('/',
    express.static(path.join(__dirname + '/../../dist/')));

  // Define route
  expressApp.use('/api*', apiRouter);
  expressApp.use('/*', pageRouter);

  // force https on Bluemix
  if (!cfenv.getAppEnv().isLocal) {
    expressApp.use(function(req, res, next) {
      if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        // returns true is protocol = https
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
  }

  var expressServer = null;

  this.getExpressApp = function() {
    return expressApp;
  };

  this.setExpressServer = function(server) {
    expressServer = server;
  };

  this.getExpressServer = function() {
    return expressServer;
  };

  this.getHandleBarsInstance = function() {
    return handleBarsInstance;
  };
}

ServerController.prototype.startServer = function(port) {
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

  // userDAO.update({userid: 2, username: 'test2', password: 'test'})
  // .then(userDAO.list)
  // .then(function(rows) {
  //   console.log(rows);
  // });

  var server = this.getExpressApp().listen(port, () => {
    var serverPort = server.address().port;
    console.log('Server running on port ' + serverPort);
  });
  this.setExpressServer(server);
};

ServerController.prototype.addEndpoint = function(endpoint, controller) {
  // Add the endpoint and call the onRequest method when a request is made
  this.getExpressApp().get(endpoint, function(req, res) {
    controller.onRequest(req, res);
  });
};

module.exports = new ServerController();