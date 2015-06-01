angular
  .module('app', [
    require('./pages').name,
    require('./data-flow/api-service'),
    require('./components'),
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    var configName = 'configOne';

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        template: '<h1>Angular-herp</h1><ui-view />',
        resolve: {
            loadSessions: function(ApiService) {
                return ApiService.loadSessions();
            }
        }
      });

  })
  .config(function($stateProvider) {

    var configName = 'configTwo';

    $stateProvider.state('app.dashboard', {
      url: 'dashboard',
      template: '<h1>Dashboard</h1><page-index />'
    });

  });
