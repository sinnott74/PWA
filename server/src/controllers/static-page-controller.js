'use strict';

var pathConfigs = require('../models/path-config.js');

function StaticPageController() {
}

// This method looks at the request path and renders the appropriate handlebars
// template
StaticPageController.prototype.onRequest = function(req, res) {
  console.log('Page request for: ' + req.path);

  var pathConfig = pathConfigs.getConfig(req.path);
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

module.exports = StaticPageController;
