'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('MainCtrl', ['$scope', 'github',  function ($scope, github) {
    github.getRepoList().success(function(repos){
        $scope.repos = repos;
    });

    $scope.fetchChildren = function(id) {

    };
  }]);
