// Define our routes
'use strict';

import './pages/index/index.js';
import './data-flow/api-service.js';

angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            template: '<page-index></page-index>',
            resolve: {
                loadSessions: function(ApiService) {
                    return ApiService.loadSessions();
                }
            }
        });
});
