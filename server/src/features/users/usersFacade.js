'user strict';

var userDAO = require('./usersDAO');

var userFacade = {};

userFacade.readByID = function(userKey) {
  console.log('Read user by ID - ' + userKey.id);
  return userDAO.read(userKey.id);
};

userFacade.listAllUsers = function() {
  console.log('List all users');
  return userDAO.list();
};

module.exports = userFacade;