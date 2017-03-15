'use strict';

var pathConfigs = require('../models/path-config.js');

class PageConfigManager {

  getConfig(req, res) {
    var pathConfig = pathConfigs.getConfig(req.path);
    if (!pathConfig) {
      res.status(404).send();
    }

    return pathConfig;
  }
}

module.exports = new PageConfigManager();