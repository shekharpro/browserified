'use strict';

// We can just require angular as if we were in node
var angular = require('angular');

// initialize app with dependencies required
var app = angular.module('myApp', []);

// Controller defination
// We can use our WelcomeCtrl.js as a module.
var WelcomeCtrl = require('./controllers/WelcomeCtrl');
app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);

var AboutCtrl = require('./controllers/AboutCtrl');
app.controller('AboutCtrl', ['$scope', AboutCtrl]);

// var app = angular.module('myApp', ['uiRouter']);
// app.config(['$stateProvider',
//   function($stateProvider) {
//     $stateProvider
//
//     .state('welcome', {
//       views: {
//         'contents': {
//           controller: require('./controllers/WelcomeCtrl'),
//           templateUrl: '/views/index.html'
//         }
//       }
//     }).state('about', {
//       views: {
//         'contents': {
//           controller: require('./controllers/AboutCtrl'),
//           templateUrl: '/views/index.html'
//         }
//       }
//     });
//
//   }
// ]);

// var WelcomeCtrl = require('./controllers/WelcomeCtrl');
// app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
//
// var AboutCtrl = require('./controllers/AboutCtrl');
// app.controller('AboutCtrl', ['$scope', AboutCtrl]);

//
// var ContactCtrl = require('./controllers/ContactCtrl');
// app.controller('ContactCtrl', ['$scope', ContactCtrl]);
