'use strict';

var knex = require('../core/database');

/**
 * Abstract class for all Entity DAOs
 * @class
 * @abstract
 *
 * Sub classes must define:
 *  An attribute tableName which represents the name of the table which the DAO will access.
 *  An method validate(entity) which will validate each entity object.
 */
class DAO {

  /**
   * Constructor for abstract DAO classes.
   * @throws {Error} if called directly
   * @throws {TypeError} if tableName attribute is not set on sub class.
   * @throws {TypeError} if validate function is not defined on sub class.
   * @private
   */
  constructor() {
    if (this.constructor === DAO) {
      throw new Error('This Class should not be instantiated, please extend');
    }

    if(!this.tableName || typeof this.tableName !== 'string') {
      throw new TypeError('tableName attribute must be set to the name of the entity');
    }

    if(typeof this.validate !== 'function') {
      throw new TypeError('validate method must be implemented');
    }
  }

  /**
   * Create a entry on this table
   * @paramater {object} entity
   * @returns {Promise<Number>} A promise which resolves to an ID of an entity
   */
  create(entity) {
    this.validate(entity);
    return knex(this.tableName).insert(entity).returning('id')
    .then((idArray) => {
      // check that only 1 ID is returned
      if (idArray.length !== 1) {
        throw new Error(this.tableName + ' insertion failed');
      }
      // return a promise containing that single ID
      return new Promise(function(resolve, reject) {
        resolve(idArray[0]);
      });
    });
  }

  /**
   * Reads a entry from this table
   * @paramater {number} id of an entity
   * @returns {Promise<Object>} A promise which resolves to entity
   */
  read(id) {
    this.validateID(id);
    return knex(this.tableName).where('id', id)
    .then((entityArray) => {
      // check that only 1 entity is returned
      if (entityArray.length !== 1) {
        throw new Error(this.tableName + ' read failed');
      }
      // return a promise containing that single entity
      return new Promise(function(resolve, reject) {
        resolve(entityArray[0]);
      });
    });
  }

  /**
   * Updates a entry on this table
   * @paramater {object} entity containing a valid id and the details to update to
   * @returns {Promise}
   */
  update(entity) {
    this.validateID(entity.id);
    this.validate(entity);
    return knex(this.tableName).update(entity).where('id', entity.id);
  }

  /**
   * Deletes a entry on this table
   * @paramater {object} entity containing a valid id
   * @returns {Promise}
   */
  delete(entity) {
    this.validateID(entity.id);
    this.validate(entity);
    return knex(this.tableName).del().where('id', entity.id);
  }

  /**
   * List all entries on this table
   * @returns {Promise<Array>} A promise which resolves an array of entities
   */
  list() {
    return knex(this.tableName);
  }

  /**
   * Validates that the given parameter is a number
   * @paramater {number} id of an entity
   * @throws {TypeError} if given id is not a number
   */
  validateID(id) {
    console.log(id);
    if(isNaN(id)) {
      throw new TypeError('ID must be a number');
    }
  }
}

module.exports = DAO;