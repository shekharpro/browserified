
exports.inject = function(app) {
  app.controller('ContactCtrl', exports.controller);
  return exports.controller;
};

module.exports = function ContactCtrl($scope) {
  $scope.firstname="";
  $scope.lastname="";
  $scope.testContactVar = 'Hello Contact!';
};
