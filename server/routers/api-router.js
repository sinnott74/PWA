'use strict';

var router = require('express').Router();
var APIController = require('../controllers/api-controller');

router.get('/*', new APIController().onRequest);

module.exports = router;
