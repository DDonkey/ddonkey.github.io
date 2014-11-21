function AuthController($scrop){
	$scrop.auth = function(){
		var authUrl = g.getAuthURL('37166cf1a32a1b3f6701',['user','repo']);
		$location(authUrl);
	}
}

function HomeController($scrop){
	g.getRepoList(function(repos){
		$scrop.repos = repos;
	});
}