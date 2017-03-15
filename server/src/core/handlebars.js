var exphbs = require('express-handlebars');
var path = require('path');

var handleBarsInstance = exphbs.create({
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, '/../views/layouts'),
  partialsDir: path.join(__dirname, '/../views/partials')
});

module.exports = handleBarsInstance;