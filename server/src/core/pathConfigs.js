'use strict';
/**
 * This module is responsible for all interactions with path configurations.
 * It will read the path-config.json for all features
 * And merge them into a single path configuration object.
 */

/**
 * Required modules
 */
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
var featurePathConfigPaths = glob.sync('server/src/features/**/path-config.json');

/**
 * Add each configured path into the master pathConfigs object
 */
featurePathConfigPaths.forEach((featurePathConfigPath) => {
  var relativeConfigPath = path.relative(__dirname, featurePathConfigPath);
  var featureConfig = require(relativeConfigPath);
  Object.assign(pathConfigs, featureConfig);
});

/**
 * Add the inline styles to each path
 */
for(var url in pathConfigs) {
  var pathConfig = pathConfigs[url];
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