var express = require('express');
var router = new express.Router();
var APIController = require('../controllers/api-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var apiController = new APIController();

router.all('/*', businessLogic);

router.all('/*', function(req, res) {
  apiController.onRequest(req, res);
});

module.exports = router;