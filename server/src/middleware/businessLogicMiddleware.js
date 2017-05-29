'user strict';

// // var createNamespace = require('continuation-local-storage').createNamespace;
// // var session = createNamespace('session');
// var TransactionInfo = require('../core/TransactionInfo');

// /**
//  * This middleware is responsible check if a facade is configured
//  * Then converting req parameters into facade input parameters
//  * The calling the facade & adding the returned entity onto the response locals entity object.
//  * This middleware is should be called after configurationMiddleware.js
//  */

// /**
//  * Checks if a facade is configured
//  */
// function isFacadeOperationConfigured(config) {
//   if(config && config.data.facade && config.data.operation && config.data.operation.name) {
//     return true;
//   }
//   return false;
// }

// /**
//  * Converts the req paremeters i.e. params/body/query into a facade input
//  * @param {*} req
//  * @param {*} properties
//  */
// function createFacadeInput(req, properties) {
//   var facadeInput = {};

//   for(var index in properties) {
//     var property = properties[index];
//     // check for ths property on params/body/query
//     var parameter = req.params[property] || req.body[property] || req.query[property];
//     facadeInput[property] = parameter;
//   }

//   return facadeInput;
// }

// /**
//  * Calls the configured facade if there is one.
//  */
// module.exports = function(req, res, next) {
//   //
//   var pathConfig = res.locals.config;

//   if(isFacadeOperationConfigured(pathConfig)) {
//     // Get the facade path
//     let facadePath = pathConfig.data.facade;

//     // require the facade
//     let FacadeClass = require(facadePath);

//     let facadeInputAttributes = pathConfig.data.operation.input;

//     // if the facade has input attributes configured
//     // read the inputs from the  request
//     let facadeInputObject;
//     if(facadeInputAttributes) {
//       facadeInputObject = createFacadeInput(req, facadeInputAttributes);
//     }

//     // Create instance of the Facade
//     let facadeInstance = new FacadeClass();

//     //   // Get the facade operation
//     let facadeOperation = facadeInstance[pathConfig.data.operation.name];

//     // // Run facade in a transaction
//     // knex.transaction(function(transaction) {
//     //   // Create instance of the Facade
//     //   let facadeInstance = new FacadeClass();

//     //   // Get the facade operation
//     //   let facadeOperation = facadeInstance[pathConfig.data.operation.name];

//     //   return TransactionInfo.setTransaction(transaction, async function() {
//     //     return facadeOperation(facadeInputObject);
//     //   });
//     // })
//     TransactionInfo.bindEmitter(req);
//     TransactionInfo.bindEmitter(res);
//     TransactionInfo.startTransaction(function() {
//       return facadeOperation(facadeInputObject);
//     })
//     // facadeOperation(facadeInputObject)
//     .then((entity) => {
//       // Facade call successful
//       // Add entity onto locals object
//       res.locals.model = entity;
//       next();
//     })
//     .catch ((error) => {
//       let inputStringified = JSON.stringify(facadeInputObject);
//       console.error(`Error executing - ${facadePath} with inputs - ${inputStringified}`);
//       next(error);
//     });

//   // No facade needed
//   } else {
//     next();
//   }
// };

module.exports = function(req, res, next) {
  let route = res.locals.route;
  route.businessLogic()
  .then(entity => {
    res.locals.model = entity;
    next();
  })
  .catch(error => {
    console.log(error);
    next();
  });
};