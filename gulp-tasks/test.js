var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var util = require('gulp-util');

// the following line exposes two gulp tasks test:local & test:remote
// These run the web component tester locally or using sauce labs respectively
require('web-component-tester').gulp.init(gulp);

// check if running in CI environment before running WCT through saucelabs
// otherwise run WCT locally
var wctTask;
if(process.env.CI) {
  wctTask = 'test:remote';
} else {
  wctTask = 'test:local';
}

//  lint all of our javascript code
gulp.task('test:eslint', function() {
  var eslintOpts = {};

  return gulp.src([GLOBAL.config.src + '/**/*.js', GLOBAL.config.serverSrc + '/**/*.js'])

    // eslint() attaches the lint output to the eslint property,
    // of the file object so it can be used by other modules.
    .pipe(eslint(eslintOpts))

    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())

    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failAfterError());
});

gulp.task('test:server', function() {
  return gulp.src([GLOBAL.config.serverTest + '/**/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', util.log);
});

gulp.task('test', ['test:eslint', 'test:server', wctTask]);