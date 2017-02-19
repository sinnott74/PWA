'use strict';

var knexConfig = require('../data/knexfile.js');
var mode = process.env.NODE_ENV || 'development';
var dbConfig = knexConfig[mode];

console.log('Database mode used: ' + mode);
console.log('dbConfig used:');
console.log(dbConfig.connection);
var knex = require('knex')(dbConfig);

module.exports = knex;