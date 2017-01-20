var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

gulp.task('images:watch', function() {
  gulp.watch(GLOBAL.config.src + '/images/**/*.*', ['images']);
});

gulp.task('images:clean', function(cb) {
  del([GLOBAL.config.dest + '/*.{png,jpg,jpeg,gif,svg}'], {dot: true})
    .then(function() {
      cb();
    });
});

gulp.task('images', ['images:clean'], function() {
  return gulp.src(GLOBAL.config.src + '/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulpif(GLOBAL.config.env === 'prod', imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
    })))
    .pipe(gulp.dest(GLOBAL.config.dest));
});
