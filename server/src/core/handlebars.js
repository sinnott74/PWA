/**
 * This module is responsible for creating & configuring an instance of Express handlebars.
 */

/**
 * Required modules
 */
var exphbs = require('express-handlebars');
var path = require('path');

/**
 * Create & configure an instance of express handlebars
 */
var handleBarsInstance = exphbs.create({
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, '/../views/layouts'),
  partialsDir: path.join(__dirname, '/../views/partials')
});

module.exports = handleBarsInstance;