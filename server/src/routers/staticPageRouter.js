var express = require('express');
var router = new express.Router();
var PageController = require('../controllers/static-page-controller');
var businessLogic = require('../facades/businessLogicMiddleware');

var pageController = new PageController();

router.route('/*')
  .all(businessLogic)
  .all(pageController.onRequest);

module.exports = router;