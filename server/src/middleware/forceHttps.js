'use strict';

module.exports = function(req, res, next) {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    // returns true if protocol = https
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
};