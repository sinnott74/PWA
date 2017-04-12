'use strict';

var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var polylint = require('gulp-polylint');

gulp.task('polylint', function() {
  return gulp.src(GLOBAL.config.src + '/elements/**/*.html')
    .pipe(polylint())
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    .pipe(polylint.reporter.fail({buffer: true, ignoreWarnings: false}));
});

// Vulcanize take all of our polymer elements and
//  merges them into a single file so they can be retrieved in a single request
gulp.task('vulcanize', ['polylint', 'bower'], function() {
  return gulp.src(GLOBAL.config.src + '/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest(GLOBAL.config.dest + '/elements'));
});