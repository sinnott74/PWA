'use strict';
/**
 * This module is responsible for defining the abstact Class Route.
 * Route is the base class for all routes in the application
 */
var fs = require('fs');
var path = require('path');

class Route {

  /**
   * Constructor for abstract Route classes.
   * @throws {Error} if called directly
   * @throws {TypeError} if routeID attribute is not set on sub class.
   * @private
   */
  constructor(req, res) {
    if (this.constructor === Route) {
      throw new Error('This Class should not be instantiated, please extend');
    }

    if(!this.routeID || typeof this.routeID !== 'string') {
      throw new TypeError('routeID attribute must be set on the route');
    }

    if(!this.businessLogic || typeof this.businessLogic !== 'function') {
      throw new TypeError('businessLogic method must be implemented');
    }

    this.req = req;
    this.res = res;

    let cssPath = path.resolve(__dirname, '../../../webclient/build/styles/core.css');
    this.inlineStyles = '' + fs.readFileSync(cssPath);
  }

}

module.exports = Route;