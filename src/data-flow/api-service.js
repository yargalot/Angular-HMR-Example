'use strict';

var moduleName = module.exports = 'app.services';

angular
  .module(moduleName, [])
  .factory('ApiService', require('./service'));
