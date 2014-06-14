exports.inject = function(app) {
  app.controller('ContactCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function ContactCtrl($scope) {
  $scope.testContactVar = 'Hello Contact!';
};
