// The index page, used in routes
'use strict';

var moduleName = module.exports = 'app.pages';

angular
  .module(moduleName, [])
  .run(function() {
    console.log('Derping and Herping');
  })
  .directive('pageIndex', require('./pageIndex'));
