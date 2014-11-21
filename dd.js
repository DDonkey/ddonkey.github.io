var token = document.cookie;
if(!token){
	$location.path('/auth');
}
else{
	var g = new github(token);
}

function initDD(){
	g.forkRepo('DDonkey', 'blog', changeRepoName);
}

function changeRepoName(repoInfo){
	g.editRepo(repoInfo.owner.login, repoInfo.name, {
		name: repoInfo.owner.login+'.github.io';
	}, function(result){
		if(result.name == repoInfo.owner.login+'.github.io'){
			console.log('Success!');
		}
		else{
			console.log(result);
		}
	});
}