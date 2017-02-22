'use strict';
// node_modules/mocha/bin/mocha server/test/DAO/userDAOTest.js
var assert = require('assert');
var userDAO = require('../../src/DAO/usersDAO');

describe('userDAO tests', function() {
  /**
   *
   */
  it('should create an entry on the user table, read it back then delete it', function(done) {
    // user object
    var user = {
      username: 'testUsername',
      password: 'testPassword',
      firstname: 'testFirstName',
      lastname: 'testLastName',
      dob: new Date( 2017, 1, 1)
    };

    // create the user
    userDAO.create(user)
    .then((id) => {
      // then read it back
      userDAO.read(id)
      .then((dbUser) => {
        // then assert all values match
        assert.equal(dbUser.username, user.username);
        assert.equal(dbUser.password, user.password);
        assert.equal(dbUser.firstname, user.firstname);
        assert.equal(dbUser.lastname, user.lastname);
        assert.equal(dbUser.dob.getTime(), user.dob.getTime());

        // then delete the user
        userDAO.delete(dbUser)
        .then(() => {
          done();
        });
      });
    });
  });
});

