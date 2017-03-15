'use strict';

var path = require('path');
var pathConfigs = require('../models/path-config.js');
var handlebarsInstance = require('../core/handlebars');

function APIController() {
}

// This method looks at the request path and renders the appropriate handlebars
// template
APIController.prototype.onRequest = function(req, res) {
  console.log('API request for: ' + req.path);

  // var urlSections = req.path.split('/');
  // urlSections = urlSections.filter(function(sectionString) {
  //   return sectionString.length > 0;
  // });

  // var urlPath = null;
  // if (urlSections.length === 1) {
  //   urlPath = '/';
  // } else {
  //   urlPath = '/' + urlSections[1];
  // }

  // var urlPath = req.path;

  var pathConfig = pathConfigs.getConfig(req.path);
  if (!pathConfig) {
    res.status(404).send();
    return;
  }

  var viewPath = path.join(
    __dirname,
    '/../views',
    pathConfig.data.view + '.handlebars'
  );

  handlebarsInstance.render(viewPath, pathConfig)
  .then(function(renderedTemplate) {
    res.json({
      title: pathConfig.data.title,
      partialinlinestyles: pathConfig.data.inlineStyles,
      partialremotestyles: pathConfig.data.remoteStyles,
      partialscripts: pathConfig.data.remoteScripts,
      partialhtml: renderedTemplate
    });
  })
  .catch(function(err) {
    res.status(500).send();
  });
};

module.exports = APIController;
