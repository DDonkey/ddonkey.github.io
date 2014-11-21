var DD = DD || angular.module('DD',['ngRoute']);

DD.controller('AuthController', function($scope){
	$scope.auth = function(){
		var authUrl = g.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
		$location(authUrl);
	}
});

DD.controller('HomeController', function($scope){
	$scope.callbackRepoList = function(repos){
		$scope.repos = repos;
	}
	g.getRepoList($scope.callbackRepoList);
});