module.exports = function($scope, ApiService, $cacheFactory) {

    $scope.pageIndexVar = 'Herp';

    ApiService.loadSessions().success(function(data) {
      $scope.sessions = data;
    });

};
