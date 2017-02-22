var express = require('express');
var router = new express.Router();
var PageController = require('../controllers/static-page-controller');

router.get('/*', function(req, res) {
  new PageController().onRequest(req, res);
});

module.exports = router;