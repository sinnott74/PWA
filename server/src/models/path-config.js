var fs = require('fs');
var path = require('path');

var pathConfigs = {
  '/': {
    view: 'index',
    title: 'Index',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/url-1': {
    view: 'url-1',
    title: 'URL 1',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/url-2': {
    view: 'url-2',
    title: 'URL 2',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/app-shell': {
    view: '',
    title: 'App Shell',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/404': {
    view: '404',
    title: '404',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  }
};

function getFileContents(files) {
  // Concat inline styles for document <head>
  var flattenedContents = '';
  var pathPrefix = '/../../../build/';
  files.forEach(function(file) {
    flattenedContents += fs.readFileSync(path.resolve(__dirname) +
      pathPrefix + file);
  });

  return flattenedContents;
}

module.exports = {
  getConfig: function(urlPath) {
    var object = pathConfigs[urlPath];

    // Check if the path is actually valid.
    if (!object) {
      return null;
    }

    return {
      'data': object
    };
  },

  get404: function() {
    return {
      'data': pathConfigs['/404']
    };
  }
};
