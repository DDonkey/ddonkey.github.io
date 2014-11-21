var DD = DD || angular.module('DD',['ngRoute']);

DD.service('getRepoList', function(){
	var scope = this;
	g.getRepoList(function(repos){
		scope.repos = repos;
	});
});