var DD = DD || angular.module('DD',['ngRoute']);

DD.controller('AuthController', ['$scope', '$location', function($scope, $location){
	$scope.auth = function(){
		var authUrl = g.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
		$location(authUrl);
	}
}]);

DD.controller('HomeController', function($scope){
	g.getRepoList(function(repos){
		$scope.$apply(function(){
			$scope.repos = repos;
		});
	});
});