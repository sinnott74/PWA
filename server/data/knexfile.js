'use strict';

var cfApp = require('cfenv').getAppEnv();
var postgresqlProductionConfig = cfApp.getServices('postgresql');
console.log(JSON.stringify(postgresqlProductionConfig));
var productionDbUri;

if(postgresqlProductionConfig['postgresql-2v']
  && postgresqlProductionConfig['postgresql-2v'].credentials) {
  console.log(JSON.stringify(postgresqlProductionConfig['postgresql-2v']));
  productionDbUri = postgresqlProductionConfig['postgresql-2v'].credentials;
}
console.log(JSON.stringify(postgresqlProductionConfig['postgresql-2v']));

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
    connection: productionDbUri,
    debug: true
  }
};
