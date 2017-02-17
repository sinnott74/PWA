'use strict';

var knexConfig = require('../data/knexfile.js');
var dbConfig;

if (process.env.NODE_ENV === 'production') {
  console.log('production');
  dbConfig = knexConfig.production;
} else {
  console.log('not production');
  dbConfig = knexConfig.development;
}
console.log('databaseconfig used: ' + dbConfig);
var knex = require('knex')(dbConfig);

module.exports = knex;