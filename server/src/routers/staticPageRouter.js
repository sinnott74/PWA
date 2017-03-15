var express = require('express');
var router = new express.Router();
var PageController = require('../controllers/static-page-controller');

var pageController = new PageController();

router.all('/*', function(req, res) {
  pageController.onRequest(req, res);
});

module.exports = router;