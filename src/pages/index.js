// The index page, used in routes
'use strict';

var moduleName = module.exports = angular
  .module('app.pages', [])
  .run(function() {
    console.log('Derping and Herping');
  })
  .directive('pageIndex', require('./pageIndex'));
