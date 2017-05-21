var CLS = require('continuation-local-storage');
var createNameSpace = CLS.createNamespace;
var getNameSpace = CLS.getNamespace;
var knex = require('../core/database');

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

TransactionInfo.bindEmitter = function(obj) {
  let session = getNameSpace(kNAMESPACE);
  session.bindEmitter(obj);
};

module.exports = TransactionInfo;