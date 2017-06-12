var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
  del([global.config.clientDest, global.config.serverBuild], {dot: true})
    .then(function() {
      cb();
    });
});
