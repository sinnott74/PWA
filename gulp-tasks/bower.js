var gulp = require('gulp');
var bower = require('gulp-bower');

// installs bower dependencies & pipes them into dist/lib
gulp.task('bower', function(cb) {
  return bower();
});