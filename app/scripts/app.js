'use strict';

/**
 * @ngdoc overview
 * @name ddonkeyApp
 * @description
 * # ddonkeyApp
 *
 * Main module of the application.
 */
angular
  .module('ddonkeyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/editor', {
        templateUrl: 'views/editor.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$location', 'github', '$rootScope', function($location, github, $rootScope){
    var token = localStorage.token;
    if(!token){
      $location.path('/auth');
    }
    else{
      github.token = token;
      github.getUserInfo().success(function(info){
        $rootScope.currentUser = info;
      });
    }
  }]);
