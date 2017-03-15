'use strict';

var pathConfigManager = require('../core/PathConfigManager');

function StaticPageController() {
}

// This method looks at the request path and renders the appropriate handlebars
// template
StaticPageController.prototype.onRequest = function(req, res) {
  console.log('Page request for: ' + req.path);

  var pathConfig = pathConfigManager.getConfig(req, res);

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
};

module.exports = StaticPageController;
