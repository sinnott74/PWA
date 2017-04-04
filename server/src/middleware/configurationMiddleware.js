'user strict';

/**
 * This middleware is responsible for reading the configuration for each configured path
 * & adding them on the relevent response locals config object
 */

var express = require('express');
var router = new express.Router();
var pathConfigs = require('../models/path-config.js');

var urls = pathConfigs.getAllURLs();

// Loop through each url configured in path-config.js
urls.forEach(function(url) {
  // read the configuration
  var config = pathConfigs.getConfig(url);

  // tell router to use this function for the configured url
  router.use(url, function(req, res, next) {
    // add the configuration onto the response locals object
    res.locals.config = config;
    next();
  });
});

module.exports = router;