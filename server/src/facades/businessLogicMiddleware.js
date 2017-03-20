'user strict';

var express = require('express');
var userFacade = require('../facades/usersFacade');
var router = new express.Router();

router.use('/users', userFacade);

module.exports = router;