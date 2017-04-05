var fs = require('fs');
var path = require('path');
var glob = require('glob');

/**
 * Default paths
 */
var pathConfigs = {
  '/app-shell': {
    view: '',
    title: 'App Shell',
    facade: '',
    operation: {},
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/404': {
    view: '404',
    title: '404',
    facade: '',
    operation: {},
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  }
};

/**
 * Search for path-config files
 */
var featureConfigPaths = glob.sync('server/src/features/**/path-config.js');

/**
 * Add each configured path into the master pathConfigs object
 */
for(var index in featureConfigPaths) {
  // featureConfigPaths is the path from server .i.e server/src/etc..
  var relativeFeatureConfigPath = path.relative(__dirname, featureConfigPaths[index]);
  var featurePathConfig = require(relativeFeatureConfigPath);
  Object.assign(pathConfigs, featurePathConfig);
}

/**
 * Add the inline styles to each path
 */
for(var pathIndex in pathConfigs) {
  var pathConfig = pathConfigs[pathIndex];
  pathConfig.inlineStyles = getFileContents(['/styles/core.css']);
}


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
  },

  getAllURLs: function() {
    return Object.keys(pathConfigs);
  }
};