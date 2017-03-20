'user strict';

var express = require('express');
var router = new express.Router();

var userDAO = require('../DAO/usersDAO');

router.get('/', (req, res, next) => {
  console.log('List all users');
  userDAO.list()
  .then((users) => {
    res.locals.model = users;
    next();
  });
});

router.get('/:id', (req, res, next) => {
  console.log('In user get - ID: ' + req.params.id);
  userDAO.read(req.params.id)
  .then((user) => {
    res.locals.model = user;
    next();
  });
});

module.exports = router;