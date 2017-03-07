var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gutil = require('gulp-util');

// the following line exposes two gulp tasks test:local & test:remote
// These run the web component tester locally or using sauce labs respectively
require('web-component-tester').gulp.init(gulp);

//  lint all of our javascript code
gulp.task('test:eslint', function() {
  var eslintOpts = {};

  return gulp.src([GLOBAL.config.src + '/**/*.js'])

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

// check if SAUCE_USERNAME & SAUCE_ACCESS_KEY environment variable are set, run wct using sauce labs
// otherwise run local wct
var wctTask;
if(gutil.env.SAUCE_USERNAME && gutil.env.SAUCE_ACCESS_KEY) {
  wctTask = 'test:remote';
} else {
  wctTask = 'test:local';
}

gulp.task('test', ['test:eslint', wctTask]);