'use strict'; // Used in session-list

import '../../data-flow/api-service.js';

angular.module('app.components')

.directive('sessionItem',function() {
    return {
        restrict : 'E',
        scope: {
            session: '='
        },
        bindToController: true,
        controllerAs: 'state',
        replace: true,
        controller: function(ApiService) {
            this.onClick = () => {
                ApiService.setSessionAsAttending(this.session.id);
                console.log('derp');
            };
        },
        template: `
            <a class="list-group-item"
                 ng-class="{'active': state.session.attending}"
                 ng-click="state.onClick()">
                    {{::state.session.title}}
            </a>
        `
    };
});
