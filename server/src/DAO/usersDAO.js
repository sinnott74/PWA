'use strict';
var DAO = require('./DAO');

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
}
module.exports = new UsersDAO();