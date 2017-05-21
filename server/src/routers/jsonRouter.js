var express = require('express');
var router = new express.Router();
var jsonController = require('../controllers/json-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');
var pathConfiguration = require('../middleware/configurationMiddleware');
var transaction = require('../middleware/transactionMiddleware');
var pathConfigs = require('../core/pathConfigs.js');

// Read all urls
var urls = pathConfigs.getAllURLs();

// configure router for each url
urls.forEach((url) => {
  router.route(url)
    .all(transaction)
    .all(pathConfiguration)
    .all(businessLogic)
    .all(jsonController.onBusinessLogicError)
    .all(jsonController.onRequest);
});

module.exports = router;