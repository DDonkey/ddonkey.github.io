'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('AuthCtrl', ['$scope', '$window', 'github', '$location', function ($scope, $window, github, $location) {
    $scope.auth = function(){
    	var clientId = $location.host() === 'localhost' ? '37166cf1a32a1b3f6701': 'e2358f780058fbf3d575';
        var authUrl = github.getAuthURL(clientId,['user','repo']);
        $window.location.href = authUrl;
    };
  }]);
