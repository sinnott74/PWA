'use strict';
var DAO = require('../../core/DAO');
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
  async validate(user) {
    if(!user) {
      throw new TypeError('User object invalid');
    }
  }

/**
 * Hook point called before the creation of the user on the database.
 * Hashes a user's password.
 * @param {*} user
 */
  async preCreate(user) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  async isUserNameAvailable(userName) {
    let entityArray = await this.database(this.tableName)
                            .transacting(this.transaction)
                            .where('username', userName);

    if(entityArray.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Read user table by username
   * @param {*} userName
   */
  async readByUserName(userName) {
    let entityArray = await this.database(this.tableName)
                            .transacting(this.transaction)
                            .where('username', userName);

    if(entityArray.length === 1) {
      return entityArray[0];
    }
    throw new Error();
  }
}

module.exports = UsersDAO;