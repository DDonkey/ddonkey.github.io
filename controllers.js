var DD = DD || angular.module('DD',['ngRoute']);

DD.controller('AuthController', ['$scope', '$window', function($scope, $location){
	$scope.auth = function(){
		var authUrl = g.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
		$window.location.href = authUrl;
	}
}]);

DD.controller('HomeController', function($scope){
	g.getRepoList(function(repos){
		$scope.$apply(function(){
			$scope.repos = repos;
		});
	});
});