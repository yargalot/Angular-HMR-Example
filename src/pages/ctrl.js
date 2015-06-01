module.exports = function($scope, ApiService) {

    $scope.pageIndexVar = 'DERNNNN';

    ApiService.loadSessions().success(function(data) {
      $scope.sessions = data;
    });

};
