var gulp = require('gulp');
var bower = require('gulp-bower');
var path = require('path');

// installs bower dependencies & pipes them into dist/lib
gulp.task('bower', function(cb) {
  return bower();
});