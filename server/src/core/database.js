'use strict';
/**
 * This module is repsonsible for creating & configuring an instance of knex.
 * Knex will be used to interact with the database.
 */

/**
 * Required modules
 */
var knexConfig = require('../data/knexfile.js'); // require knex configuration object

// Set our mode, falling back to development if not provided.
var mode = process.env.NODE_ENV || 'development';
var dbConfig = knexConfig[mode];

console.log('Database mode used: ' + mode);
console.log('dbConfig used:');
console.log(dbConfig.connection);
var knex = require('knex')(dbConfig);

module.exports = knex;