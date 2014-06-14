'use strict';

var testDir = function($timeout) {

  console.log('atleast here');

  return {
    restrict: "E", // directive is an Element (not Attribute)
    scope: {
      // set up directive's isolated scope
      firstname: "=",
      lastname: "="

    },
    // template: '<div>Hello to {{firstname}} {{lastname}} From a harmless Directive</div>',
    replace: true, // replace original markup with template
    transclude: false, // do not copy original HTML content
    controller: ["$scope",
      function($scope) {
        console.log("********directive's controller********");
        $scope.firstname = 'Saurabh';
        $scope.lastname = 'Sharma';
        console.log($scope.firstname);
        console.log($scope.lastname);
        // $scope.$apply();
      }
    ],
    link: function(scope, element, attrs, controller) {
      console.log("****************directive's link********************");
      scope.firstname = "Who the Hell first name";
      scope.lastname = "Who the Hell last name";
      console.log(scope.firstname);
      console.log(scope.lastname);
      scope.message = "Hi '" + scope.firstname + "' '" + scope.lastname + "'";
      element.html("Directly from Directive >>>> Hi '" + scope.firstname +
        "' '" + scope.lastname + "'");
      // scope.$apply();
      $timeout(function(){
        scope.$apply();
      });
      // if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
      //   scope.$apply();
      // }
    }
  }
};

module.exports = testDir;
