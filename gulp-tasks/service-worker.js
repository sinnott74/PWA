var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var swPrecache = require('sw-precache');

// This is used as the cacheID, worth only reading the file once.
var packageName = JSON.parse(fs.readFileSync('./package.json', 'utf8')).name;

gulp.task('service-worker:watch', function(cb) {
  gulp.watch(GLOBAL.config.dest + '/**/*.*', ['service-worker']);
  gulp.watch(GLOBAL.config.src + '/../server/views/**/*.*',
    ['service-worker']);
});

gulp.task('service-worker', function(cb) {
  swPrecache.write(path.join(GLOBAL.config.dest, 'sw.js'), {
    staticFileGlobs: [
      GLOBAL.config.dest + '/**/*.{js,html,css,png,jpg,jpeg,gif,svg}',
      GLOBAL.config.dest + '/manifest.json'
    ],
    dynamicUrlToDependencies: {
      '/app-shell': ['server/views/layouts/app-shell.handlebars', 'server/views/partials/open-page.handlebars', 'server/views/partials/close-page.handlebars'],
      '/api/': [
        'server/views/index.handlebars',
        GLOBAL.config.dest + '/styles/core.css'
      ],
      '/api/url-1': [
        'server/views/url-1.handlebars'
      ],
      '/api/url-2': [
        'server/views/url-2.handlebars'
      ]
    },
    stripPrefix: GLOBAL.config.dest,
    navigateFallback: '/app-shell',
    cacheId: packageName,

    // Turn on service worker for production only
    handleFetch: (GLOBAL.config.env === 'prod')
  })
  .then(cb)
  .catch(() => {
    cb();
  });
});
