'use strict';

var path = require('path');
var handlebarsInstance = require('../core/handlebars');

var apiController = {};

// This method looks at the request path and renders the appropriate handlebars
// template
apiController.onRequest = function(req, res) {
  console.log('API request for: ' + req.path);


  var pathConfig = res.locals.config;
  if (!pathConfig) {
    res.status(404).send();
    return;
  }

  // rendering html using handlebars instead of delegating to express
  // must set model manually
  pathConfig.model = res.locals.model;

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

module.exports = apiController;
