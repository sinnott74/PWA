var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('copy:watch', function() {
  gulp.watch(GLOBAL.config.src + '/*.*', ['copy:root']);
});

gulp.task('copy:cleanRoot', function(cb) {
  del([GLOBAL.config.dest + '/*.{json,txt,ico}'], {dot: true})
    .then(function() {
      cb();
    });
});

gulp.task('copy:root', ['copy:cleanRoot'], function() {
  return gulp.src([
      GLOBAL.config.src + '/*.{json,txt,ico}',
    ])
    .pipe(gulp.dest(GLOBAL.config.dest));
});

gulp.task('copy', function(cb) {
  runSequence(
    'copy:root',
  cb);
});
