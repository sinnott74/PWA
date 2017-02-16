'use strict';

var router = require('express').Router();
var StaticPageController = require('../controllers/static-page-controller');

router.get('/*', new StaticPageController().onRequest);

module.exports = router;

