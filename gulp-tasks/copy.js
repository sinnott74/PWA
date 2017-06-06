var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('copy:watch', function() {
  gulp.watch(global.config.clientSrc + '/*.*', ['copy:root']);
});

gulp.task('copy:cleanRoot', function(cb) {
  del([global.config.clientDest + '/*.{json,txt,ico}'], {dot: true})
  .then(function() {
    cb();
  });
});

gulp.task('copy:root', ['copy:cleanRoot'], function() {
  return gulp.src([
    global.config.clientSrc + '/*.{json,txt,ico}'
  ])
  .pipe(gulp.dest(global.config.clientDest));
});

gulp.task('copy', function(cb) {
  runSequence(
    'copy:root',
  cb);
});
