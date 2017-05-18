var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
  del([global.config.dest], {dot: true})
    .then(function() {
      cb();
    });
});
