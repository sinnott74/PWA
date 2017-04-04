'use strict';
// node_modules/mocha/bin/mocha server/test/DAO/usersDAO.spec.js
require('../serverTestFramework');
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
      return Promise.resolve(dbUser);
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
  it('should not throw a TypeError for valid user', function(done) {
    var user = {
      username: 'testUsername',
      password: 'testPassword',
      firstname: 'testFirstName',
      lastname: 'testLastName',
      dob: new Date( 2017, 1, 1)
    };

    userDAO.validate(user)
    .then(() => {
      done();
    });
  });

  /**
   * Tests usersDAO#validate
   * User is invalid
   */
  it('should throw type error for invalid/null user', function(done) {
    var user = null;
    userDAO.validate(user)
    .catch((error) => {
      assert.equal(error.message, 'User object invalid');
      done();
    });
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
  it('should replace password with hashed password', function(done) {
    var testPassword = 'password';
    var user = {
      password: testPassword
    };

    userDAO.preCreate(user)
    .then(() => {
       // check password changed
      assert.notEqual(user.password, testPassword);
      // check its same length as expected hash length
      assert.equal(user.password.length, 60);
      done();
    });
  });

  it('should validate the ID & resolve', function(done) {
    var ID = 123;
    userDAO.validateID(ID)
    .then(() => done());
  });

  it('should validate the ID as a string & resolve', function(done) {
    var ID = '123';
    userDAO.validateID(ID)
    .then(() => done());
  });

  it('should validate the ID as a string & reject', function(done) {
    var ID = '123a';
    userDAO.validateID(ID)
    .catch(() => done());
  });

  it('should validate the ID as a undefined & reject', function(done) {
    var ID;
    userDAO.validateID(ID)
    .catch(() => done());
  });
});

