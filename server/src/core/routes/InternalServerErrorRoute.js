const Route = require('../Route');

/**
 * 500 configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class InternalServerErrorRoute extends Route {

  get routeID() {
    return '/500';
  }

  constructor(req, res) {
    super(req, res);
    this.title = '500';
    this.view = '500';
  }

  async businessLogic() {

  }
}

module.exports = InternalServerErrorRoute;