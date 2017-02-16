'use strict';

var knexConfig = require('../data/knexfile.js').development;
var knex = require('knex')(knexConfig);

module.exports = knex;