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
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $locationProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('auth', {
        url: '/auth',
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .state('editor', {
        url: '/editor',
        templateUrl: 'views/editor.html',
      });

      $locationProvider.html5Mode(true);
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
