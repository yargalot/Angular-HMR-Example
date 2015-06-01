module.exports = function($http, $q) {

  function loadSessions() {
    return $http.get('/data/oneSession.json');
  };

  return {
      loadSessions
  };
}
