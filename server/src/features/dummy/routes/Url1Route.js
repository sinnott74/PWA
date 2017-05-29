const Route = require('../../../core/Route');

/**
 * Url1Route configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class Url1Route extends Route {

  get routeID() {
    return '/url-1';
  }

  constructor(req, res) {
    super(req, res);
    this.title = 'Url 1';
    this.view = 'url-1';
  }

  async businessLogic() {

  }
}

module.exports = Url1Route;