// The index page, used in routes
'use strict';

var moduleName = module.exports = 'app.pages';

angular
  .module(moduleName, [])
  .run(function() {
    console.log('Derping and Herping');
  })
  .directive('pageIndex',function() {
      return {
          restrict : 'E',
          scope: {},
          bindToController: true,
          controllerAs: 'state',
          controller: function($scope, ApiService) {

              $scope.pageIndexVar = 'DERNNNN';

              ApiService.loadSessions().success(function(data) {
                $scope.sessions = data;
              });

          },
          template: `
              <h1>Angular HMR Test</h1>
              <p>THIS IS A something {{pageIndexVar}}</p>
              <session-list
                  sessions="sessions">
              </session-list>
          `
      };
  });
