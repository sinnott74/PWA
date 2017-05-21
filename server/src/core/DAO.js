'use strict';
/**
 * This module is responsible for defining the abstact Class DAO.
 * DAO should be extended by all entity DAOs.
 * This class controls access to the database.
 */

var TransactionInfo = require('./TransactionInfo');
var database = require('./database');

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
   * @param {object} Knex instance or Knex transaction object.
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

    // Read database from the transaction info
    this.database = database;
    this.transaction = TransactionInfo.getFacadeScopedObject('transaction');
  }

  /**
   * Create a entry on this table
   * @param {object} entity
   * @returns {Promise<Number>} A promise which resolves to an ID of an entity
   */
  async create(entity) {
    // validate the entity
    await this.validate(entity);
    // call subclasses preCreate implemenation
    await this.preCreate(entity);
    // insert entity onto db
    let idArray = await this.database(this.tableName)
                        .transacting(this.transaction)
                        .insert(entity)
                        .returning('id');

    if (idArray.length !== 1) {
      throw new Error(this.tableName + ' insertion failed');
    }

    return idArray[0];
  }

  /**
   * Reads a entry from this table
   * @param {number} id of an entity
   * @returns {Promise<Object>} A promise which resolves to entity
   */
  async read(id) {
    // validate the ID
    await this.validateID(id);
    // read entity
    let entityArray = await this.database(this.tableName)
                            .transacting(this.transaction)
                            .where('id', id);

    if (entityArray.length !== 1) {
      throw new Error(`Read on table ${this.tableName} failed`);
    }

    return entityArray[0];
  }

  /**
   * Updates a entry on this table
   * @param {object} entity containing a valid id and the details to update to
   * @returns {Promise}
   */
  async update(entity) {
    // validate the ID
    await this.validateID(entity.id);
    // call subclasses validate implemenation
    await this.validate(entity);
    // return promise which resolves to nothing
    return this.database(this.tableName)
            .transacting(this.transaction)
            .update(entity)
            .where('id', entity.id);
  }

  /**
   * Deletes a entry on this table
   * @param {object} entity containing a valid id
   * @returns {Promise}
   */
  async delete(entity) {
    // validate the ID
    await this.validateID(entity.id);
    // call subclasses validate implemenation
    await this.validate(entity);
    // return deletion promise
    console.log('UserID', entity.id);
    return this.database(this.tableName)
            .transacting(this.transaction)
            .where('id', entity.id)
            .del();
  }

  /**
   * List all entries on this table
   * @returns {Promise<Array>} A promise which resolves an array of entities
   */
  list() {
    return this.database(this.tableName)
            .transacting(this.transaction);
  }

  /**
   * Validates that the given parameter is a number
   * @param {number} id of an entity
   * @throws {TypeError} if given id is not a number
   */
  async validateID(id) {
    if(isNaN(id)) {
      throw new TypeError('Invalid ID - ' + id);
    }
  }

  /**
   * Hook point called before creating a record on the database.
   * @param {*} entity
   */
  async preCreate(entity) {
  }
}

module.exports = DAO;