module.exports = function(ApiService, $scope) {
  $scope.derping = 'WORKING';
  this.onClick = () => {
    ApiService.setSessionAsAttending(this.session.id);
  };
};
