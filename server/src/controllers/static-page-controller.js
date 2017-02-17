'use strict';

var pathConfigs = require('../models/path-config.js');

var userDAO = require('../DAO/usersDAO');
var knex = require('../core/database');

function StaticPageController() {
}

// This method looks at the request path and renders the appropriate handlebars
// template
StaticPageController.prototype.onRequest = function(req, res) {
  console.log('Page request for: ' + req.path);

  knex.schema.createTableIfNotExists('users', function(table) {
    table.increments();
    table.string('name');
    table.timestamps();
  })
  .then(function() {
    return userDAO.create({name: 'test'});
  })
  .then(userDAO.list)
  .then(function(rows) {
    console.log(rows);
  });

  var pathConfig = pathConfigs.getConfig(req.path);
  if (!pathConfig) {
    res.status(404).send();
    return;
  }

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
