const CLS = require('continuation-local-storage');
const createNameSpace = CLS.createNamespace;
const getNameSpace = CLS.getNamespace;
const knex = require('../core/database');
const uuidV4 = require('uuid/v4');

let kNAMESPACE = 'pwa';

// create the NameSpace
createNameSpace(kNAMESPACE);

var TransactionInfo = {};

/**
 * Starts a database transaction & adds that as a facade scoped object under the key 'database'
 */
// TransactionInfo.startTransaction = async function(cb) {
//   return knex.transaction(function(transaction) {
//     let session = getNameSpace(kNAMESPACE);
//     return session.runAndReturn(function() {
//       session.set('database', transaction);
//       return cb();
//     });
//   });
// };

TransactionInfo.startTransaction = async function(cb) {
  return knex.transaction(function(transaction) {
    let session = getNameSpace(kNAMESPACE);
    return session.runAndReturn(function() {
      // Add knex transaction object
      session.set('transaction', transaction);
      // Add transactionID for async logging
      session.set('transactionID', uuidV4());
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

TransactionInfo.bindEmitter = function(obj) {
  let session = getNameSpace(kNAMESPACE);
  session.bindEmitter(obj);
};

module.exports = TransactionInfo;