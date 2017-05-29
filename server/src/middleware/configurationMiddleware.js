'use strict';

/**
 * This middleware is responsible for reading the configuration for the path
 * & adding them on the configuration onto the response locals config object.
 */
// var pathConfigs = require('../core/pathConfigs.js');

// /**
//  * Adds the path configuration object on the response.
//  */
// module.exports = function(req, res, next) {
//   var url = req.route.path;
//   var pathConfig = pathConfigs.getConfig(url);
//   res.locals.config = pathConfig;
//   next();
// };


var router = require('../core/Router.js');
const path = require('path');

/**
 * Adds the path configuration object on the response.
 */
module.exports = function(req, res, next) {
  var url = req.route.path;
  console.log('url', url);
  let routePath = router.getRoute(url);
  let relativeRoutePath = path.relative(__dirname, routePath);
  let Route = require(relativeRoutePath);
  let route = new Route(req, res);
  res.locals.route = route;
  next();
};