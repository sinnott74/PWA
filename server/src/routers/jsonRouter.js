var express = require('express');
var router = new express.Router();
var jsonController = require('../controllers/json-controller');
var businessLogic = require('../middleware/businessLogicMiddleware');

router.route('/*')
  .all(businessLogic)
  .all(jsonController.onRequest);

module.exports = router;