'use strict';
var DAO = require('./DAO');
var bcrypt = require('bcryptjs');

/**
 * UsersDAO control all data access to the users table.
 * @class
 * @extends {DAO}
 * @inheritdoc
 */
class UsersDAO extends DAO {

/**
 * Gets the name of the table which this object can access
 * @returns {string} the name of the table
 */
  get tableName() {
    return 'users';
  }

 /**
  * Validates that the given user object is validate
  * @paramater {object} representing a user
  * @throws {TypeError} if the given user is invalid
  */
  validate(user) {
    if(!user) {
      throw new TypeError('User object invalid');
    }
  }

/**
 * Hook point called before the creation of the user on the database.
 * Hashes a user's password.
 * @param {*} user
 */
  preCreate(user) {
    var salt = bcrypt.genSaltSync();
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
}

module.exports = new UsersDAO();