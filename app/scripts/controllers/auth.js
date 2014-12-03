'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('AuthCtrl', ['$scope', '$window', 'github', function ($scope, $window, github) {
    $scope.auth = function(){
        var authUrl = github.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
        $window.location.href = authUrl;
    };
  }]);
