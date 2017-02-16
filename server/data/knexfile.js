'use strict';

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
  }
};
