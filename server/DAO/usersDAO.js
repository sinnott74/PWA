'use strict';
var knex = require('../core/database');

var usersDAO = {};
module.exports = usersDAO;

/**
 * Reads a user from the database
 * @paramater id user's ID
 * @returns {Promise}
 */
usersDAO.read = function(id) {
  // check required paramater is supplied
  if(!id) {
    throw new Error('ID paramater required');
  }

  return knex.table('users').where('userid', id);
};

/**
 * Inserts a user into the database
 * @paramater user object
 * @returns {Promise}
 */
usersDAO.create = function(user) {
  // check required paramater is supplied
  if(!user) {
    throw new Error('ID paramater required');
  }
  return knex.table('users').insert(user);
};

/**
 * Updates a user on the database
 * @paramater user object
 * @returns {Promise}
 */
usersDAO.update = function(user) {
  // check required paramater is supplied
  if(!user) {
    throw new Error('User paramater required');
  }

  var id = user.userid;
  delete user.userid;

  return knex.table('users').update(user).where('userid', id);
};

/**
 * Deletes a user on the database
 * @paramater user object
 * @returns {Promise}
 */
usersDAO.delete = function(user) {
  // check required paramater is supplied
  if(!user) {
    throw new Error('User paramater required');
  }

  return knex.table('users').del().where('userid', user.id);
};

/**
 * List all users
 * @returns {Promise}
 */
usersDAO.list = function() {
  return knex.table('users');
};