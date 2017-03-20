var express = require('express');
var router = new express.Router();
var JSONController = require('../controllers/json-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var jsonController = new JSONController();

router.all('/*', businessLogic);

router.all('/*', function(req, res) {
  jsonController.onRequest(req, res);
});

module.exports = router;