var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
  del([global.config.clientDest], {dot: true})
    .then(function() {
      cb();
    });
});
