'use strict';

var path = require('path');
var handlebarsInstance = require('../core/handlebars');
// var pathConfigs = require('../core/pathConfigs.js');
const router = require('../core/Router.js');

var apiController = {};

// This method looks at the request path and renders the appropriate handlebars
// template
apiController.onRequest = function(req, res) {
  console.log('API request for: ', req.path);


  let route = res.locals.route;
  // var pathConfig = res.locals.config;
  // if (!pathConfig) {
  //   pathConfig = pathConfigs.get404();
  // }

  // rendering html using handlebars instead of delegating to express
  // must set model manually
  // pathConfig.model = res.locals.model;

  // var viewPath = path.join(
  //   __dirname,
  //   '/../views',
  //   pathConfig.data.view + '.handlebars'
  // );

  route.model = res.locals.model;

  var viewPath = path.join(
    __dirname,
    '/../views',
    route.view + '.handlebars'
  );

  // handlebarsInstance.render(viewPath, pathConfig)
  // .then(function(renderedTemplate) {
  //   res.json({
  //     title: pathConfig.data.title,
  //     partialinlinestyles: pathConfig.data.inlineStyles,
  //     partialremotestyles: pathConfig.data.remoteStyles,
  //     partialscripts: pathConfig.data.remoteScripts,
  //     partialhtml: renderedTemplate
  //   });
  // })
  // .catch(function(err) {
  //   res.status(500).send();
  // });

  handlebarsInstance.render(viewPath, route)
  .then(function(renderedTemplate) {
    res.json({
      title: route.title,
      partialinlinestyles: route.inlineStyles,
      partialremotestyles: '',
      partialscripts: '',
      partialhtml: renderedTemplate
    });
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send();
  });
};

apiController.onBusinessLogicError = function(err, req, res, next) {
  console.error('Handling api page business logic error');
  console.error(err);
  // let pathConfig = pathConfigs.get500();
  //
  // var viewPath = path.join(
  //   __dirname,
  //   '/../views',
  //   pathConfig.data.view + '.handlebars'
  // );

  let route = router.getRoute('/500');

  let viewPath = path.join(
    __dirname,
    '/../views',
    route.view + '.handlebars'
  );

  handlebarsInstance.render(viewPath, route)
  .then(function(renderedTemplate) {
    res.json({
      title: route.title,
      partialinlinestyles: route.inlineStyles,
      partialremotestyles: '',
      partialscripts: '',
      partialhtml: renderedTemplate
    });
  });
};

module.exports = apiController;
