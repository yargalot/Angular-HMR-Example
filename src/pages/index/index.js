// The index page, used in routes
'use strict';

import '../../components/session-list/session-list.js';
import DataStore from '../../data-flow/store.js';

angular.module('app.pages')

.directive('pageIndex',function() {
    return {
        restrict : 'E',
        scope: {},
        bindToController: true,
        controllerAs: 'state',
        controller: function($scope) {

            $scope.pageIndexVar = 'dern';
            this.sessions = DataStore.getSessions();

            DataStore.onSessionsChanged(() => {
                this.sessions = DataStore.getSessions();

                $scope.$apply();
            });

        },
        template: `
            <h1>JSCONFBE 2015</h1>
            <p>THIS IS A something {{pageIndexVar}}</p>
            <session-list
                sessions="state.sessions">
            </session-list>
        `
    };
});
