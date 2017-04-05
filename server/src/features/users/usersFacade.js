'user strict';

var userDAO = require('./usersDAO');

// router.get('/:id', (req, res, next) => {
//   console.log('In user get - ID: ' + req.params.id);
//   userDAO.read(req.params.id)
//   .then((user) => {
//     res.locals.model = user;
//     next();
//   });
// });

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