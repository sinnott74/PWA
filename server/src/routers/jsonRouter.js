var express = require('express');
var router = new express.Router();
var JSONController = require('../controllers/json-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var jsonController = new JSONController();

router.route('/*')
  .all(businessLogic)
  .all(jsonController.onRequest);

module.exports = router;