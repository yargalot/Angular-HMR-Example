module.exports = function(ApiService, $scope) {
  $scope.derping = 'derping';
  this.onClick = () => {
    ApiService.setSessionAsAttending(this.session.id);
  };
};
