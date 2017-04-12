var gulp = require('gulp');
var runSequence = require('run-sequence');
var knexConfig = require('../server/src/data/knexfile.js');

// ie. development/production
var mode = process.env.NODE_ENV || 'development';
var dbConfig = knexConfig[mode];

var knex = function() {
  return require('knex')(dbConfig);
};

var migrationConfig = {
  directory: './server/src/data/migrations'
};

var seedConfig = {
  directory: './server/src/data/seeds'
};

// Migrates data to latest
gulp.task('data:latest', function() {
  var knexInstance = knex();
  return knexInstance.migrate.latest(migrationConfig)
  .then(function() {
    return knexInstance.migrate.currentVersion();
  })
  .then(function(version) {
    console.log('Lastest database to version: ' + version);
    knexInstance.destroy();
  })
  .catch(function(err) {
    console.error(err);
    knexInstance.destroy();
    return process.exit(1);
  });
});

// rolls back latest migration
gulp.task('data:rollback', function() {
  var knexInstance = knex();
  return knexInstance.migrate.rollback(migrationConfig)
  .then(function() {
    knexInstance.destroy();
  })
  .catch(function(err) {
    console.error(err);
    knexInstance.destroy();
  });
});

gulp.task('data:seed', function() {
  var knexInstance = knex();
  return knexInstance.seed.run(seedConfig)
  .then(function() {
    knexInstance.destroy();
  })
  .catch(function(err) {
    console.error(err);
    knexInstance.destroy();
    return process.exit(1);
  });
});

gulp.task('data', function(cb) {
  runSequence(
    'data:latest',
    'data:seed',
    cb
  );
});