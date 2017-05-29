const Route = require('../../../core/Route');

/**
 * 500 configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class Url2Route extends Route {

  get routeID() {
    return '/url-2';
  }

  constructor(req, res) {
    super(req, res);
    this.title = 'Url 2';
    this.view = 'url-2';
  }

  async businessLogic() {

  }
}

module.exports = Url2Route;