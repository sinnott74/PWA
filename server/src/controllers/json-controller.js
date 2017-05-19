'use strict';

var jsonController = {};

// This method looks at the request path and renders the appropriate handlebars
// template
jsonController.onRequest = function(req, res) {
  console.log('JSON request for: ' + req.path);

  var model = res.locals.model;

  if(!model) {
    res.status(404).send();
    return;
  }

  res.json(model);
  return;
};

jsonController.onBusinessLogicError = function(err, req, res, next) {
  console.error('Handling json business logic error');
  console.error(err);
  res.status(500).send();
};

module.exports = jsonController;