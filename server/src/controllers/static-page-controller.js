'use strict';

// var pathConfigs = require('../core/pathConfigs.js');
const router = require('../core/Router.js');

var staticPageController = {};

// This method looks at the request path and renders the appropriate handlebars
// template
staticPageController.onRequest = function(req, res) {
  console.log('Page request for: ' + req.path);

  let route = res.locals.route;
  // var pathConfig = res.locals.config;
  // if (!pathConfig) {
  //   pathConfig = pathConfigs.get404();
  // }

  // // NOTE res.render has access to res.locals - which is where the model is stored
  // switch (req.path) {
  // case '/app-shell':
  //   // Render with app-shell layout and include no initial content
  //   pathConfig.layout = 'app-shell';
  //   res.render('', pathConfig);
  //   return;
  // default:
  //   // Use default layout
  //   res.render(pathConfig.data.view, pathConfig);
  //   return;
  // }

  // NOTE res.render has access to res.locals - which is where the model is stored
  switch (req.path) {
  case '/app-shell':
    // Render with app-shell layout and include no initial content
    route.layout = 'app-shell';
    res.render('', route);
    return;
  default:
    // Use default layout
    res.render(route.view, route);
    return;
  }
};

staticPageController.onBusinessLogicError = function(err, req, res, next) {
  console.error('Handling static page business logic error');
  console.error(err);
  // let pathConfig = pathConfigs.get500();

  let route = router.getRoute('/500');
  res.render(route.view, route);
};

module.exports = staticPageController;
