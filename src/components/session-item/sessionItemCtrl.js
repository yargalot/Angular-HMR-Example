module.exports = function(ApiService, $scope) {
  $scope.derping = 'Herping';
  this.onClick = () => {
    ApiService.setSessionAsAttending(this.session.id);
  };
};
