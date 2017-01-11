'use strict';
// Vulcanize take all of our polymer elements & merges them into a single file so they can be retrieved in a single request

var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');

gulp.task('vulcanize', ['bower'], function() {
  return gulp.src(GLOBAL.config.src + '/elements/elements.html')
    .pipe(vulcanize())
    .pipe(gulp.dest(GLOBAL.config.dest + '/elements'));
});