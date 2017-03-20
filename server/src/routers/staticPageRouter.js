var express = require('express');
var router = new express.Router();
var PageController = require('../controllers/static-page-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var pageController = new PageController();

router.all('/*', businessLogic);

router.all('/*', function(req, res) {
  pageController.onRequest(req, res);
});

module.exports = router;