var gulp = require('gulp');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-replace');
var vulcanize = require('gulp-vulcanize');
var polylint = require('gulp-polylint');
var runSequence = require('run-sequence');

gulp.task('html:watch', function() {
  gulp.watch(global.config.clientSrc + '/**/*.html', ['html']);
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
    global.config.clientSrc + '/**/*.html', '!/**/elements/**/*.html'
  ])
    .pipe(gulpif(global.config.env === 'prod', minifyHtml()))
    .pipe(gulp.dest(global.config.clientDest));
});

gulp.task('html:replaceVersionNo', function() {
  return gulp.src([global.config.clientDest + '/**/*.html'])
    .pipe(replace(/@VERSION@/g, global.config.version))
    .pipe(gulp.dest(global.config.clientDest));
});

gulp.task('polylint', function() {
  return gulp.src(global.config.clientSrc + '/elements/**/*.html')
    .pipe(polylint({noRecursion: true}))
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    .pipe(polylint.reporter.fail({buffer: true, ignoreWarnings: false}));
});

// Vulcanize take all of our polymer elements and
//  merges them into a single file so they can be retrieved in a single request
gulp.task('vulcanize', function() {
  return gulp.src(global.config.clientSrc + '/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest(global.config.clientDest + '/elements'));
});

