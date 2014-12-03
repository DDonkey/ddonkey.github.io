'use strict';
/*
var DD = DD || angular.module('DD',['ngRoute']);

var g, u;

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
	var options = {
		path: path,
		message: 'Create '+path,
		content: $.base64.encode(content)
	};
	g.createFile(u.login, u.login+'.github.io', path, options, function(result){
		console.log(result);
	});
}

function deleteFile(path){
	g.getContent(u.login, u.login+'.github.io', path, function(result){
		var options = {
			path: path,
			message: 'Delete '+path,
			sha: result.sha
		};
		g.deleteFile(u.login, u.login+'.github.io', path, options, function(result){
			console.log(result);
		});
	});
}
*/