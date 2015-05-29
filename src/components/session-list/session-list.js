'use strict';  // Used in: page-index

import '../session-item/session-item.js';

angular.module('app.components')

.directive('sessionList',function() {
    return {
        restrict : 'E',
        scope: {
            sessions: '='
        },
        bindToController: true,
        controllerAs: 'state',
        controller: require('./ctrl.js'),
        template: require('./template.html')
    };
})
//.controller('testCtrl', require('./ctrl.js'));
