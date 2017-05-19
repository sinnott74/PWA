'user strict';

var UserDAO = require('./usersDAO');

class UserFacade {

  async readByID(userKey) {
    console.log('Read user by ID - ' + userKey.id);
    let userDAO = new UserDAO();
    return userDAO.read(userKey.id);
  }

  async createUser(user) {
    console.log(`Creating user - ${JSON.stringify(user)}`);
    let userDAO = new UserDAO();

    user.dob = new Date();

    let userID = await userDAO.create(user);
    return userDAO.read(userID);
  }

  async listAllUsers() {
    console.log('List all users');
    let userDAO = new UserDAO();
    return userDAO.list();
  }
}

module.exports = UserFacade;