var express = require('express');
var router = new express.Router();
var staticPageController = require('../controllers/static-page-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');
var pathConfiguration = require('../middleware/configurationMiddleware');
var pathConfigs = require('../core/pathConfigs.js');

// Read all urls
var urls = pathConfigs.getAllURLs();

// configure router for each url
urls.forEach((url) => {
  router.route(url)
    .all(pathConfiguration)
    .all(businessLogic)
    .all(staticPageController.onRequest);
});

module.exports = router;