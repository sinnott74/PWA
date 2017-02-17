'use strict';

var cfApp = require('cfenv').getAppEnv();
var postgresqlProductionConfig = cfApp.getServices('postgresql');
console.log(JSON.stringify(postgresqlProductionConfig));
var productionDbCredentials;

if(postgresqlProductionConfig[0]) {
  productionDbCredentials = postgresqlProductionConfig['postgresql-2v'].credentials;
}

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
    connection: productionDbCredentials
  }
};
