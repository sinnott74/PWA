'user strict';

/**
 * This middleware is responsible check if a facade is configured
 * Then converting req parameters into facade input parameters
 * The calling the facade & adding the returned entity onto the response locals entity object.
 * This middleware is should be called after configurationMiddleware.js
 */

/**
 * Checks if a facade is configured
 */
function isFacadeOperationConfigured(config) {
  if(config && config.data.facade && config.data.operation && config.data.operation.name) {
    return true;
  }
  return false;
}

/**
 * Converts the req paremeters i.e. params/body/query into a facade input
 * @param {*} req
 * @param {*} properties
 */
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

/**
 * Calls the configured facade if there is one.
 */
module.exports = function(req, res, next) {
  //
  var pathConfig = res.locals.config;

  if(isFacadeOperationConfigured(pathConfig)) {
    var facade = require(pathConfig.data.facade);

    if(pathConfig.data.operation.input) {
      var facadeInputObject = createFacadeInput(req, pathConfig.data.operation.input);
    }

    // call the facade which returns a promise for an entity
    facade[pathConfig.data.operation.name](facadeInputObject)
    .then((entity) => {
      // Add that entity onto the response locals object so it can be access from the view
      res.locals.model = entity;
      next();
    });
  } else {
    next();
  }
};