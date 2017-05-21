'use strict';

let TransactionInfo = require('../core/TransactionInfo');
/**
 * This middle ware is responsible for beginning a database transaction for the request
 * & storing it in a continuous local storage.
 */

module.exports = function(req, res, next) {
  TransactionInfo.bindEmitter(req);
  TransactionInfo.bindEmitter(res);
  TransactionInfo.startTransaction(next);
};