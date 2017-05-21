'use strict';
// node_modules/mocha/bin/mocha server/test/features/users/usersDAO.spec.js
require('../../serverTestFramework');
var assert = require('assert');
var UserDAO = require('../../../src/features/users/usersDAO');
var TransactionInfo = require('../../../src/core/TransactionInfo');

describe('userDAO', function() {
  /**
   *
   */
  it('should create an entry on the user table, read it back then delete it', function(done) {
    TransactionInfo.startTransaction(async function() {
      let userDAO = new UserDAO();

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
      let id = await userDAO.create(user);

      // read it back
      let dbUser = await userDAO.read(id);

      // assert all values
      assert.equal(dbUser.username, user.username);
      assert.equal(dbUser.password, user.password);
      assert.notEqual(dbUser.password, testPassword); // check password has been hashed
      assert.equal(dbUser.firstname, user.firstname);
      assert.equal(dbUser.lastname, user.lastname);
      assert.equal(dbUser.dob.getTime(), user.dob.getTime());

      // delete user
      await userDAO.delete(dbUser);
    })
    .then((test) => {
      done();
    });
  });

  it('should rollback after creating a user then throwing an error', function(done) {
    let testUsername = 'testUsername';

    TransactionInfo.startTransaction(async function() {
      let userDAO = new UserDAO();

      var testPassword = 'password';

      // user object
      var user = {
        username: testUsername,
        password: testPassword,
        firstname: 'testFirstName',
        lastname: 'testLastName',
        dob: new Date( 2017, 1, 1)
      };

      // create user
      await userDAO.create(user);
      // throw an error to roll back the transaction
      throw new Error();
    })
    .catch((error1) => {
      TransactionInfo.startTransaction(function() {
        let userDAO = new UserDAO();
        userDAO.readByUserName(testUsername)
        .catch((error2) => {
          // Error should be thrown because user is not in the database
          done();
        });
      });
    });
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

    var userDAO = new UserDAO();

    userDAO.validate(user)
    .then(() => {
      done();
    })
    .catch((error) => {
      console.log(error);
      assert.fail();
    });
  });

  /**
   * Tests usersDAO#validate
   * User is invalid
   */
  it('should throw type error for invalid/null user', function(done) {
    var user = null;
    let userDAO = new UserDAO();

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
    let userDAO = new UserDAO();
    assert.equal(userDAO.tableName, 'users');
  });

  /**
   * Tests usersDAO#preCreate.
   */
  it('should replace password with hashed password', async function() {
    var testPassword = 'password';
    var user = {
      password: testPassword
    };

    let userDAO = new UserDAO();

    await userDAO.preCreate(user);

    // check password changed
    assert.notEqual(user.password, testPassword);
    // check its same length as expected hash length
    assert.equal(user.password.length, 60);
  });

  it('should validate the ID & resolve', function(done) {
    var ID = 123;

    let userDAO = new UserDAO();

    userDAO.validateID(ID)
    .then(() => done())
    .catch(() => {
      assert.fail();
      done();
    });
  });

  it('should validate the ID as a string & resolve', function(done) {
    var ID = '123';

    let userDAO = new UserDAO();

    userDAO.validateID(ID)
    .then(() => done())
    .catch(() => {
      assert.fail();
      done();
    });
  });

  it('should validate the ID as a string & reject', function(done) {
    var ID = '123a';

    let userDAO = new UserDAO();

    userDAO.validateID(ID)
    .then(() => {
      assert.fail();
      done();
    })
    .catch(() => done());
  });

  it('should validate the ID as a undefined & reject', function(done) {
    var ID;

    let userDAO = new UserDAO();

    userDAO.validateID(ID)
    .then(() => {
      assert.fail();
      done();
    })
    .catch(() => done());
  });

  it('should check if a username is available. Username is taken', function() {
    TransactionInfo.startTransaction(async function() {
      // username is used by seed data
      let username = 'test@test.com';

      let userDAO = new UserDAO();

      let isUserNameAvailable = await userDAO.isUserNameAvailable(username);
      assert.equal(isUserNameAvailable, false);
    });
  });

  it('should check if a username is available. Username is free', function() {
    TransactionInfo.startTransaction(async function() {
      // username is not used by seed data
      let username = 'test2@test.com';

      let userDAO = new UserDAO();

      let isUserNameAvailable = await userDAO.isUserNameAvailable(username);
      assert.equal(isUserNameAvailable, true);
    });
  });

  it('should read a user by username', function() {
    TransactionInfo.startTransaction(async function() {
      let userDAO = new UserDAO();

      // username is used by seed data
      let username = 'test@test.com';
      let user = await userDAO.readByUserName(username);
      assert.equal(user.username, 'test@test.com');
      assert.equal(user.firstname, 'Test');
      assert.equal(user.lastname, 'Test');
    });
  });
});

