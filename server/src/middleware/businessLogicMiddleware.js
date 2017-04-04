'user strict';

/**
 * This middleware is responsible for reading the configurated facade for each path
 * And telling the router to call it & add the result to the reponse locals entity object.
 */

var express = require('express');
var router = new express.Router();
var pathConfigs = require('../models/path-config.js');

var urls = pathConfigs.getAllURLs();

/**
 * Checks if a facade operation has been configured.
 * @param {*} config
 * @returns true if both a facade & operation are on the config data object, false otherwise
 */
function isFacadeOperationConfigured(config) {
  if(config && config.data.facade && config.data.operation && config.data.operation.name) {
    return true;
  }
  return false;
}

function createFacadeInput(req, properties) {
  var facadeInput = {};

  for(var index in properties) {
    var property = properties[index];
    // check for ths property on params/body/query
    var parameter = req.params[property] || req.body[property] || req.query[property];
    facadeInput[property] = parameter;
  }

  return facadeInput;
}

// Loop through each url configured in path-config.js
// Check is a facade operation is configurated
// Tell router to use that opertation for that path
urls.forEach(function(url) {
  var config = pathConfigs.getConfig(url);

  // check facade is configured
  if(isFacadeOperationConfigured(config)) {
    // require that facade
    var facade = require(config.data.facade);

    // tell router to use this function for the configured url
    router.use(url, function(req, res, next) {
      // create facade input class and add req parameters onto it
      if(config.data.operation.input) {
        var facadeInputObject = createFacadeInput(req, config.data.operation.input);
      }

      // call the facade which returns a promise for an entity
      facade[config.data.operation.name](facadeInputObject)
      .then((entity) => {
        // Add that entity onto the response locals object so it can be access from the view
        res.locals.model = entity;
        next();
      });
    });
  }
});

module.exports = router;