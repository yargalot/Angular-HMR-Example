'use strict';

var moduleName = module.exports = 'app.services';

angular
  .module(moduleName, [])
  .service('ApiService', require('./service'));
