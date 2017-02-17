'use strict';

var cfApp = require('cfenv').getAppEnv();
var postgresqlProductionConfig = cfApp.getServices('postgresql');
console.log(postgresqlProductionConfig);
var productionDbUri;

if(postgresqlProductionConfig[0]) {
  productionDbUri = postgresqlProductionConfig[0].credentials.uri;
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
    connection: productionDbUri
  }
};
