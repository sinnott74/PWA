var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var path = require('path');
var glob = require('glob');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
var license = require('gulp-license');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('scripts:watch', function() {
  gulp.watch(global.config.clientSrc + '/**/*.js', ['scripts']);
  gulp.watch(['./.eslintrc', './.eslintignore'], ['scripts']);
});

// Takes a set of objects defining inputs of javascript files
// to run through browserify and babelify
function compileES6Bundles(browserifyBundles, cb) {
  // Check if there is anything to do
  if (browserifyBundles.length === 0) {
    return cb();
  }

  var finishedCount = 0;
  browserifyBundles.forEach(function(bundle) {
    var browserifyBundle = browserify({
      entries: [bundle.srcPath]
    })
    .transform('babelify', {presets: ['es2015']});

    try {
      return browserifyBundle.bundle()
        .on('log', gutil.log.bind(gutil, 'Browserify Log'))
        .on('error', function(err) {
          gutil.log('Browserify Error', err);
          this.emit('end');
        })
        .pipe(source(bundle.outputFilename))
        .pipe(replace(/@VERSION@/g, global.config.version))

        // If this is a production build - minify JS
        .pipe(gulpif(global.config.env === 'prod', streamify(uglify())))
        .pipe(license(global.config.license, {tiny: true}))
        .pipe(gulp.dest(bundle.dest))
        .on('end', function() {
          finishedCount++;

          if (finishedCount === browserifyBundles.length) {
            cb();
          }
        });
    } catch (exception) {
      console.log(exception);
    }
  });
}

// This takes a source path and finds all files ending
// with .es6.js and creates the bundles to run through browserify
// and babelify
function generateES6Bundles(srcPath, cb) {
  if (!srcPath) {
    return cb(new Error('Invalid source path given to generateES6Bundles'));
  }

  var es6Filepaths = glob.sync(srcPath + '/**/*.es6.js');

  var browserifyBundles = [];
  es6Filepaths.forEach(function(filepath) {
    var filename = path.basename(filepath);
    var directoryOfFile = path.dirname(filepath);
    var relativeDirectory = path.relative(
      srcPath,
      directoryOfFile);

    // Replace .es6.js with .js for the final output
    var outputFilename =
      filename.substring(0, filename.length - '.es6.js'.length) + '.js';

    browserifyBundles.push({
      srcPath: './' + filepath,
      outputFilename: outputFilename,
      dest: path.join(global.config.clientDest, relativeDirectory)
    });
  });

  compileES6Bundles(browserifyBundles, cb);
}

gulp.task('scripts:eslint', function() {
  return gulp.src([global.config.clientSrc + '/**/*.js'])

    // eslint() attaches the lint output to the eslint property,
    // of the file object so it can be used by other modules.
    .pipe(eslint())

    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())

    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(gulpif(global.config.env === 'prod', eslint.failOnError()));
});

gulp.task('scripts:es6', function(cb) {
  generateES6Bundles(global.config.clientSrc, cb);
});

gulp.task('scripts:es5', function() {
  return gulp.src([global.config.clientSrc + '/**/*.es5.js'])
    .pipe(gulpif(global.config.env !== 'prod', sourcemaps.init()))

    // Remove the .es5 from the end of the file name using gulp-rename
    .pipe(rename(function(filePath) {
      var fileExtensionLength = '.es5'.length;
      filePath.basename = filePath.basename.substr(
        0, filePath.basename.length - fileExtensionLength);
    }))

    .pipe(replace(/@VERSION@/g, global.config.version))
    .pipe(gulpif(global.config.env === 'prod', uglify()))
    .pipe(license(global.config.license, {tiny: true}))
    .pipe(gulpif(global.config.env !== 'prod', sourcemaps.write()))
    .pipe(gulp.dest(global.config.clientDest));
});

// Delete any files currently in the scripts destination path
gulp.task('scripts:clean', function(cb) {
  del([global.config.dest + '/**/*.js', '!' + global.config.clientDest + '/lib/**'], {dot: true})
    .then(function() {
      cb();
    });
});

gulp.task('scripts', function(cb) {
  runSequence(
    [
      'scripts:clean',
      'scripts:eslint'
    ],
    [
      'scripts:es6',
      'scripts:es5'
    ],
    cb
  );
});
