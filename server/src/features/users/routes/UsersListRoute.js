var FacadeRoute = require('../../../core/FacadeRoute');

/**
 * UsersListRoute configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class UsersListRoute extends FacadeRoute {

  get routeID() {
    return '/users/:id(\\d+)';
  }
  get facade() {
    return '../features/users/usersFacade';
  }

  constructor(req, res) {
    super(req, res);
    this.title = 'Users';
    this.view = 'users_list';
    this.operation = 'listAllUsers';
  }
}

module.exports = UsersListRoute;