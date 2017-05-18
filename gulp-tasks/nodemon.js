var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

gulp.task('nodemon', function() {
  env({
    vars: {
      PORT: global.config.port
    }
  });

  return nodemon({
    script: 'app.js'
  });
});
