const Route = require('../Route');

/**
 * AppShell configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class AppShellRoute extends Route {

  get routeID() {
    return '/app-shell';
  }

  constructor(req, res) {
    super(req, res);
    this.title = 'App Shell';
    this.layout = 'app-shell';
  }

  async businessLogic() {

  }
}

module.exports = AppShellRoute;