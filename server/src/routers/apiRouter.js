var express = require('express');
var router = new express.Router();
var APIController = require('../controllers/api-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var apiController = new APIController();

router.route('/*')
  .all(businessLogic)
  .all(apiController.onRequest);

module.exports = router;