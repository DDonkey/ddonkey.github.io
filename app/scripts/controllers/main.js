'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('MainCtrl', ['$scope', 'github', 'topicModel', '$state', '$rootScope',
    function ($scope, github, topicModel, $state, $rootScope) {
    github.getRepoList().success(function(repos){
        if ($rootScope.currentUser) {
            $scope.blogRepo = _.find(repos, {name: $rootScope.currentUser.login.toLowerCase() + ".github.io"});
        }
        else {
            github.getUserInfo().success(function(info){
                $rootScope.currentUser = info;
                $scope.blogRepo = _.find(repos, {name: $rootScope.currentUser.login.toLowerCase() + ".github.io"});
              });
        }
    });

    $scope.repoInfo = {
    	owner: '',
    	name: ''
    }

    $scope.blogList = [];

    $scope.fetchChildren = function(id) {
    	var owner = id.split('/')[0];
    	var repo  =id.split('/')[1];
    	github.getContent(owner, repo, '_posts').success(function(items) {
    		$scope.repoInfo.owner = owner;
    		$scope.repoInfo.name = repo;
    		items = items.reverse();
			items.forEach(function(entry) {
				var suffix = "md";
				if (entry["name"].indexOf(suffix, entry["name"].length - suffix.length) !== -1){
					$scope.blogList.push(entry);
				}
    		});
    		console.log($scope.blogList);
    	});
    };

    $scope.selectTopic = function(topic) {
    	topicModel.selectedTopic = topic;
    	topicModel.selectedTopic.owner = $scope.repoInfo.owner;
    	topicModel.selectedTopic.repoName = $scope.repoInfo.name;
    	$state.go('editor', 
            {owner: topicModel.selectedTopic.owner, 
                repo: topicModel.selectedTopic.repoName, 
                path: topicModel.selectedTopic.path});
    }
  }]);
