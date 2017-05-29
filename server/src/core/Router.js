'use strict';
/**
 * This module is responsible for reading a configuration for a route
 */

const path = require('path');
const glob = require('glob');

class Router {

  constructor() {
    this.loadRoutes();
  }

  loadRoutes() {
    this.routes = {};
    let routePaths = glob.sync('server/src/**/routes-config.json');
    console.log(routePaths);

    routePaths.forEach((routePath) => {
      let relativeRoutePath = path.relative(__dirname, routePath);
      let route = require('./' + relativeRoutePath);
      let routeDirectoryPath = path.dirname(routePath);

      // Set directory to Route Class path
      for(let key in route) {
        route[key] = path.join(routeDirectoryPath, route[key]);
      }
      Object.assign(this.routes, route);
    });
  }

  getRoute(routeID) {
    let routeClasspath = this.routes[routeID];
    console.log('routeClasspath', routeClasspath);
    if(!routeClasspath) {
      console.log('404', this.routes['/404']);
      return this.routes['/404'];
    }
    return routeClasspath;
  }

  getAllRouteURLs() {
    return Object.keys(this.routes);
  }
}

module.exports = new Router();