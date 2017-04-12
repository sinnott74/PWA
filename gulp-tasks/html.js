var gulp = require('gulp');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-replace');
var vulcanize = require('gulp-vulcanize');
var polylint = require('gulp-polylint');
var runSequence = require('run-sequence');

gulp.task('html:watch', function() {
  gulp.watch(GLOBAL.config.src + '/**/*.html', ['html']);
});

gulp.task('html', ['bower'], function(cb) {
  runSequence(
    'polylint',
    'vulcanize',
    'html:replaceVersionNo',
    cb
  );
});

// copies all html files into the dist directory
// ignoring webcomponent elements as these are included in elements.html during vulcanization
gulp.task('html:copyToDest', function() {
  return gulp.src([
    GLOBAL.config.src + '/**/*.html', '!/**/elements/**/*.html'
  ])
    .pipe(gulpif(GLOBAL.config.env === 'prod', minifyHtml()))
    .pipe(gulp.dest(GLOBAL.config.dest));
});

gulp.task('html:replaceVersionNo', function() {
  return gulp.src([GLOBAL.config.dest + '/**/*.html'])
    .pipe(replace(/@VERSION@/g, GLOBAL.config.version))
    .pipe(gulp.dest(GLOBAL.config.dest));
});

gulp.task('polylint', function() {
  return gulp.src(GLOBAL.config.src + '/elements/**/*.html')
    .pipe(polylint({noRecursion: true}))
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    .pipe(polylint.reporter.fail({buffer: true, ignoreWarnings: false}));
});

// Vulcanize take all of our polymer elements and
//  merges them into a single file so they can be retrieved in a single request
gulp.task('vulcanize', function() {
  return gulp.src(GLOBAL.config.src + '/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest(GLOBAL.config.dest + '/elements'));
});

