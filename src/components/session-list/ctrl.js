module.exports = function($scope, ApiService) {
  $scope.herp = 'A HERP A DERP';

  $scope.sessions = ApiService.loadSessions();
};
