var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var swPrecache = require('sw-precache');

// This is used as the cacheID, worth only reading the file once.
var packageName = JSON.parse(fs.readFileSync('./package.json', 'utf8')).name;

gulp.task('service-worker:watch', function() {
  gulp.watch(global.config.dest + '/**/*.*', ['service-worker']);
  gulp.watch(global.config.src + '/../server/views/**/*.*', ['service-worker']);
  gulp.watch(global.config.src + '/../gulp-tasks/service-worker.js', ['service-worker']);
});

gulp.task('service-worker', function(cb) {
  swPrecache.write(path.join(global.config.dest, 'sw.js'), {
    staticFileGlobs: [
      global.config.dest + '/**/*.{js,html,css,png,jpg,jpeg,gif,svg}',
      global.config.dest + '/manifest.json'
    ],
    dynamicUrlToDependencies: {
      '/': [
        'server/src/views/layouts/default.handlebars',
        'server/src/views/partials/open-page.handlebars',
        'server/src/views/partials/close-page.handlebars',
        global.config.dest + '/styles/core.css'
      ],
      '/app-shell': [
        'server/src/views/layouts/app-shell.handlebars',
        'server/src/views/partials/open-page.handlebars',
        'server/src/views/partials/close-page.handlebars',
        global.config.dest + '/styles/core.css'
      ],
      '/api/': [
        'server/src/views/index.handlebars',
        global.config.dest + '/styles/core.css'
      ],
      '/api/url-1': [
        'server/src/views/url-1.handlebars'
      ],
      '/api/url-2': [
        'server/src/views/url-2.handlebars'
      ]
    },
    stripPrefix: global.config.dest,
    // navigateFallback: '/',
    cacheId: packageName,
    logger: gutil.log,

    // Turn on service worker for production only
    handleFetch: (global.config.env === 'prod')
  })
  .then(cb)
  .catch(() => {
    cb();
  });
});
