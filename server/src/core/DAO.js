'use strict';
/**
 * This module is responsible for defining the abstact Class DAO.
 * DAO should be extended by all entity DAOs.
 * This class controls access to the database.
 */

/**
 * Required modules
 */
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
   * @param {object} entity
   * @returns {Promise<Number>} A promise which resolves to an ID of an entity
   */
  create(entity) {
    // validate the entity
    return this.validate(entity)
      .then(() => this.preCreate(entity))
      .then(() => knex(this.tableName).insert(entity).returning('id'))
      .then((idArray) => {
        return new Promise(function(resolve, reject) {
          // check that only 1 ID is returned
          if (idArray.length !== 1) {
            throw new Error(this.tableName + ' insertion failed');
          }
          resolve(idArray[0]);
        });
      }
    );
  }

  /**
   * Reads a entry from this table
   * @param {number} id of an entity
   * @returns {Promise<Object>} A promise which resolves to entity
   */
  read(id) {
    // validate the ID
    return this.validateID(id)
      .then(() => knex(this.tableName).where('id', id))
      .then((entityArray) => {
        return new Promise(function(resolve, reject) {
          // check that only 1 entity is returned
          if (entityArray.length !== 1) {
            throw new Error(this.tableName + ' read failed');
          }
          resolve(entityArray[0]);
        });
      }
    );
  }

  /**
   * Updates a entry on this table
   * @param {object} entity containing a valid id and the details to update to
   * @returns {Promise}
   */
  update(entity) {
    // validate the ID
    return this.validateID(entity.id)
      // call subclasses validate implemenation
      .then(() => this.validate(entity))
      .then(() => knex(this.tableName).update(entity).where('id', entity.id));
  }

  /**
   * Deletes a entry on this table
   * @param {object} entity containing a valid id
   * @returns {Promise}
   */
  delete(entity) {
    // validate the ID
    return this.validateID(entity.id)
      // call subclasses validate implemenation
      .then(() => this.validate(entity))
      .then(() => knex(this.tableName).del().where('id', entity.id));
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
   * @param {number} id of an entity
   * @throws {TypeError} if given id is not a number
   */
  validateID(id) {
    return new Promise(function(resolve, reject) {
      // check its a number
      if(isNaN(id)) {
        throw new TypeError('Invalid ID - ' + id);
      }
      resolve();
    });
  }

  /**
   * Hook point called before creating a record on the database.
   * @param {*} entity
   */
  preCreate(entity) {
  }
}

module.exports = DAO;