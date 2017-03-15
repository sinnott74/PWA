var express = require('express');
var router = new express.Router();
var APIController = require('../controllers/api-controller');

var apiController = new APIController();

router.all('/*', function(req, res) {
  apiController.onRequest(req, res);
});

module.exports = router;