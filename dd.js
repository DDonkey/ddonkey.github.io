var DD = DD || angular.module('DD',['ngRoute']);

var g, u;

DD.run(['$location', function($location){
	var token = document.cookie;
	g = new github(token);
	if(!token){
		$location.path('/auth');
	}
	else{
		g.getUserInfo(function(info){
			u = info;
		});
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

function createFile(path, content){
	g.createFile(u.login, u.login+'.github.io', path, {
		path: path,
		message: 'Create '+path,
		content: $.base64.encode(content)
	}, function(result){
		console.log(result);
	});
}