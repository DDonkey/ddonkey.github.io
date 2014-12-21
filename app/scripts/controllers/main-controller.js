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
    $scope.rootScope = $rootScope;
    github.getRepoList().success(function(repos){
        if ($rootScope.currentUser) {
            console.log($rootScope.currentUser);
            $scope.blogRepo = _.find(repos, {name: $rootScope.currentUser.login.toLowerCase() + ".github.io"});
            $scope.fetchChildren($scope.blogRepo.full_name);
            $scope.fetchCommitActivity($scope.blogRepo.full_name);
        }
        else {
            github.getUserInfo().success(function(info){
                $rootScope.currentUser = info;
                console.log(info);
                $scope.blogRepo = _.find(repos, {name: $rootScope.currentUser.login.toLowerCase() + ".github.io"});
                $scope.fetchChildren($scope.blogRepo.full_name);
                $scope.fetchCommitActivity($scope.blogRepo.full_name);
              });
        }
    });

    $scope.repoInfo = {
    	owner: '',
    	name: ''
    }

    $scope.blogList = [];

    $scope.fetchCommitActivity = function(id) {
        var owner = id.split('/')[0];
        var repo  =id.split('/')[1];
        github.getRepoCommitActivity(owner, repo).then(function(resp) {
            var ctx = document.getElementById("commitActChart").getContext("2d");
            var options = {};
            var labels = [];
            var data = [];
            for(var i = 1; i <= 52; i++) {
                labels.push(i);
                data.push(resp.data[i - 1].total);
            }
            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: data
                    }
                ]
                };
            var myBarChart = new Chart(ctx).Bar(data, options);
        });
    };

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
