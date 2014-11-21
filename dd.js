var DD = DD || angular.module('DD',['ngRoute']);

var g;

DD.run(['$location', function($location){
	var token = document.cookie;
	g = new github(token);
	if(!token){
		$location.path('/auth');
	}
}]);

function initDD(){
	g.forkRepo('DDonkey', 'blog', changeRepoName);
}

function changeRepoName(repoInfo){
	g.editRepo(repoInfo.owner.login, repoInfo.name, {
		name: repoInfo.owner.login+'.github.io'
	}, function(result){
		if(result.name == repoInfo.owner.login+'.github.io'){
			console.log('Success!');
		}
		else{
			console.log(result);
		}
	});
}