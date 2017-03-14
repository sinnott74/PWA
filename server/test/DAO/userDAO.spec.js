'use strict';
// node_modules/mocha/bin/mocha server/test/DAO/userDAO.spec.js
var assert = require('assert');
var userDAO = require('../../src/DAO/usersDAO');

describe('userDAO tests', function() {
  /**
   *
   */
  it('should create an entry on the user table, read it back then delete it', function(done) {
    var testPassword = 'password';

    // user object
    var user = {
      username: 'testUsername',
      password: testPassword,
      firstname: 'testFirstName',
      lastname: 'testLastName',
      dob: new Date( 2017, 1, 1)
    };

    // create user
    userDAO.create(user)
    // read it back
    .then((id) => userDAO.read(id))
    // assert all values
    .then((dbUser) => {
      // then assert all values match
      assert.equal(dbUser.username, user.username);
      assert.equal(dbUser.password, user.password);
      assert.notEqual(dbUser.password, testPassword); // check password has been hashed
      assert.equal(dbUser.firstname, user.firstname);
      assert.equal(dbUser.lastname, user.lastname);
      assert.equal(dbUser.dob.getTime(), user.dob.getTime());
      return new Promise(function(resolve, reject) {
        resolve(dbUser);
      });
    })
    // delete user
    .then((dbUser) => userDAO.delete(dbUser))
    // finish test
    .then(() => done());
  });

  /**
   * Tests usersDAO#validate.
   * User is a valid entity
   */
  it('should not throw a TypeError for valid user', function() {
    var user = {
      username: 'testUsername',
      password: 'testPassword',
      firstname: 'testFirstName',
      lastname: 'testLastName',
      dob: new Date( 2017, 1, 1)
    };

    userDAO.validate(user);
  });

  /**
   * Tests usersDAO#validate
   * User is invalid
   */
  it('should throw type error for invalid/null user', function() {
    var user = null;
    assert.throws(function() {
      userDAO.validate(user);
    }, TypeError, 'User is invalid');
  });

  /**
   * Tests usersDAO#tableName
   */
  it('should return the table name', function() {
    assert.equal(userDAO.tableName, 'users');
  });

  /**
   * Tests usersDAO#preCreate.
   */
  it('should replace password with hashed password', function() {
    var testPassword = 'password';
    var user = {
      password: testPassword
    };

    userDAO.preCreate(user);
    console.log(`Password was ${testPassword}, but then became ${user.password}`);

    assert.notEqual(user.password, testPassword);
  });
});

