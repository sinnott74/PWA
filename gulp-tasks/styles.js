var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var license = require('gulp-license');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles:watch', function() {
  gulp.watch(GLOBAL.config.src + '/**/*.scss', ['styles']);
});

// Delete any files currently in the scripts destination path
gulp.task('styles:clean', function(cb) {
  del([GLOBAL.config.dest + '/**/*.css'], {dot: true})
    .then(function() {
      cb();
    });
});

gulp.task('styles:sass', function() {
  return gulp.src(GLOBAL.config.src + '/**/*.scss')
    // output sass lint if in dev
    .pipe(gulpif(GLOBAL.config.env === 'dev', sasslint()))
    .pipe(gulpif(GLOBAL.config.env === 'dev', sasslint.format()))
    // Only create sourcemaps for dev
    .pipe(gulpif(GLOBAL.config.env !== 'prod', sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulpif(GLOBAL.config.env === 'prod', cleanCSS()))
    .pipe(license(GLOBAL.config.license, {tiny: true}))
    .pipe(gulpif(GLOBAL.config.env !== 'prod', sourcemaps.write()))
    .pipe(gulp.dest(GLOBAL.config.dest));
});

gulp.task('styles', function(cb) {
  runSequence(
    'styles:clean',
    'styles:sass',
    cb
  );
});
