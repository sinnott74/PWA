var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

gulp.task('images:watch', function() {
  gulp.watch(global.config.clientSrc + '/images/**/*.*', ['images']);
});

gulp.task('images:clean', function(cb) {
  del([global.config.clientDest + '/*.{png,jpg,jpeg,gif,svg}'], {dot: true})
    .then(function() {
      cb();
    });
});

gulp.task('images', ['images:clean'], function() {
  return gulp.src(global.config.clientSrc + '/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulpif(global.config.env === 'prod', imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    })))
    .pipe(gulp.dest(global.config.clientDest));
});
