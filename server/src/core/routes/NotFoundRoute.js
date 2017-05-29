const Route = require('../Route');

/**
 * 404 configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class NotFoundRoute extends Route {

  get routeID() {
    return '/404';
  }

  constructor(req, res) {
    super(req, res);
    this.title = '404';
    this.view = '404';
  }

  async businessLogic() {

  }
}

module.exports = NotFoundRoute;