var gulp = require('gulp');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-replace');

gulp.task('html:watch', function() {
  gulp.watch(GLOBAL.config.src + '/**/*.html', ['html']);
});

// copies all html files into the dist directory
// ignoring webcomponent elements as these are included in elements.html during vulcanization
gulp.task('html', function() {
  return gulp.src([
    GLOBAL.config.src + '/**/*.html', '!/**/elements/**/*.html'
  ])
    .pipe(gulpif(GLOBAL.config.env == 'prod', minifyHtml()))
    .pipe(replace(/@VERSION@/g, GLOBAL.config.version))
    .pipe(gulp.dest(GLOBAL.config.dest));
});
