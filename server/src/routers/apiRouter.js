var express = require('express');
var router = express.Router();
var APIController = require('../controllers/api-controller');

router.get('/*', function(req, res) {
  new APIController().onRequest(req, res);
});

module.exports = router;