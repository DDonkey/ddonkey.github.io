'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
