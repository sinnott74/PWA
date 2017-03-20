'use strict';

function JSONController() {
}

// This method looks at the request path and renders the appropriate handlebars
// template
JSONController.prototype.onRequest = function(req, res) {
  console.log('JSON request for: ' + req.path);

  var model = res.locals.model;

  if(!model) {
    res.status(404).send();
    return;
  }

  res.json(model);
  return;
};

module.exports = JSONController;