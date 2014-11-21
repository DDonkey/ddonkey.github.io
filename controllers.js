var DD = DD || angular.module('DD',['ngRoute']);

DD.controller('AuthController', function($scrope){
	$scrop.auth = function(){
		var authUrl = g.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
		$location(authUrl);
	}
});

DD.controller('HomeController', function($scrope){
	g.getRepoList(function(repos){
		$scrop.repos = repos;
	});
});