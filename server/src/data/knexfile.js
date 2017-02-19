'use strict';

var cfApp = require('cfenv').getAppEnv();
var services = cfApp.getServices('postgresql') || {};
var dbConfig = services['ElephantSQL-nx'] || {};
var credentials = dbConfig.credentials || {};
var uri = credentials.uri || '';

// Database connection object
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'pwadb',
      host: 'localhost'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    debug: true
  },

  production: {
    client: 'pg',
    connection: uri,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
