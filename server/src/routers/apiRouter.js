var express = require('express');
var router = new express.Router();
var apiController = require('../controllers/api-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');
var pathConfiguration = require('../middleware/configurationMiddleware');

router.route('/*')
  .all(pathConfiguration)
  .all(businessLogic)
  .all(apiController.onRequest);

module.exports = router;