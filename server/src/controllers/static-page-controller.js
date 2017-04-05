'use strict';

var pathConfigs = require('../core/pathConfigManager.js');

var staticPageController = {};

// This method looks at the request path and renders the appropriate handlebars
// template
staticPageController.onRequest = function(req, res) {
  console.log('Page request for: ' + req.path);

  var pathConfig = res.locals.config;
  if (!pathConfig) {
    pathConfig = pathConfigs.get404();
  }

  // NOTE res.render has access to res.locals - which is where the model is stored
  if(pathConfig) {
    switch (req.path) {
    case '/app-shell':
      // Render with app-shell layout and include no initial content
      pathConfig.layout = 'app-shell';
      res.render('', pathConfig);
      return;
    default:
      // Use default layout
      res.render(pathConfig.data.view, pathConfig);
      return;
    }
  }
};

module.exports = staticPageController;
