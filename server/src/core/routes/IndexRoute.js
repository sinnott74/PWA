const Route = require('../Route');

/**
 * 500 configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class IndexRoute extends Route {

  get routeID() {
    return '/';
  }

  constructor(req, res) {
    super(req, res);
    this.title = 'Index';
    this.view = 'index';
  }

  async businessLogic() {

  }
}

module.exports = IndexRoute;