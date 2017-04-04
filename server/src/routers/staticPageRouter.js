var express = require('express');
var router = new express.Router();
var staticPageController = require('../controllers/static-page-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');
var pathConfiguration = require('../middleware/configurationMiddleware');

router.route('/*')
  .all(pathConfiguration)
  .all(businessLogic)
  .all(staticPageController.onRequest);

module.exports = router;