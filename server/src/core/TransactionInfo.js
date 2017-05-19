var CLS = require('continuation-local-storage');
var createNameSpace = CLS.createNamespace;
var getNameSpace = CLS.getNamespace;
var knex = require('../core/database');

let kNAMESPACE = 'session';

var TransactionInfo = {};

/**
 * Starts a database transaction & adds that as a facade scoped object under the key 'database'
 */
TransactionInfo.startTransaction = async function(cb) {
  return knex.transaction(function(transaction) {
    var session = createNameSpace(kNAMESPACE);
    return session.runAndReturn(function() {
      session.set('database', transaction);
      return cb();
    });
  });
};

/**
 * Reads a facade scoped object.
 */
TransactionInfo.getFacadeScopedObject = function(key) {
  let session = getNameSpace(kNAMESPACE);
  return session.get(key);
};

/**
 * Sets a facade scoped object.
 */
TransactionInfo.setFacadeScopedObject = function(key, object) {
  let session = getNameSpace(kNAMESPACE);
  session.set(key, object);
};

module.exports = TransactionInfo;