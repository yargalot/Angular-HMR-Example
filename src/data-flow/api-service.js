'use strict';

import DataActions from './actions.js';
import DataStore from './store.js';

angular.module('app.services')
.factory('ApiService', function($http, $q) {

    const loadSessions = function() {
        if(DataStore.getSessions().length) {
            return $q.when([]);
        }
        
        var get = $http.get('/data/sessions.json');

        get.then((response) => {
            DataActions.setSessions(response.data);
        });

        return get;
    };

    const setSessionAsAttending = function(id) {

        // Do an API request here..
        DataActions.setSessionAsAttending(id);
    };


    return {
        loadSessions, setSessionAsAttending
    };
});
