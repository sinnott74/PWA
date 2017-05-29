var express = require('express');
var router = new express.Router();
var apiController = require('../controllers/api-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');
var pathConfiguration = require('../middleware/configurationMiddleware');
// var pathConfigs = require('../core/pathConfigs.js');
const appRouter = require('../core/Router.js');

// Read all urls
// var urls = pathConfigs.getAllURLs();

let urls = appRouter.getAllRouteURLs();

// configure router for each url
urls.forEach((url) => {
  router.route(url)
    .all(pathConfiguration)
    .all(businessLogic)
    .all(apiController.onBusinessLogicError)
    .all(apiController.onRequest);
});

module.exports = router;