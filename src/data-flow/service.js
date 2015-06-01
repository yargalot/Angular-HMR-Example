module.exports = function($http, $q) {

    function loadSessions() {
      return $http.get('/data/sessions.json');
    };

    return {
        loadSessions
    };
}
