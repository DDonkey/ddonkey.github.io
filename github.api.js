var github = function(token){
	var scope = this;

	scope.githubApiRequest = function(uri, method, parameter, callback){
		if(typeof(method)!=='string'){
			parameter = method;
			callback = parameter;
			method = 'GET';
		}
		if(typeof(parameter)=='function'){
			callback = parameter;
			parameter = {};
		}
		else{
			parameter = parameter?parameter:{};
		}
		parameter.access_token = token;

		if(method.toUpperCase() == 'POST'){
			parameter = JSON.stringify(parameter);
		}

		var url = 'https://api.github.com'+uri;
		$.ajax({
			url: url,
			type: method,
			data: parameter,
			dataType: 'json',
			success: callback
		});
	};

	scope.getAuthURL = function(cliendId, scopes){
		var authBase = 'https://github.com/login/oauth/authorize';
		var parameter = {
			client_id: cliendId,
			scope: scopes.join(',')
		};
		var q = '';
		for(var key in parameter){
			if(q){
				q += '&';
			}
			q += key+'='+parameter[key];
		}
		return authBase+'?'+q;
	}

	scope.getUserInfo = function(callback){
		scope.githubApiRequest('/user', callback);
	};

	scope.getRepoList = function(callback){
		scope.githubApiRequest('/user/repos', callback);
	};

	scope.createRepo = function(options, callback){
		scope.githubApiRequest('/user/repos', 'POST', options, callback);
	};

	scope.getContent = function(owner, repo, path, callback){
		scope.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path, callback);
	};

	scope.createFile = function(owner, repo, path, callback){
		scope.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path, 'PUT', callback);
	};

	scope.deleteFile = function(owner, repo, path, callback){
		scope.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path, 'DELETE', callback);
	};

	scope.editRepo = function(owner, repo, options, callback){
		scope.githubApiRequest('/repos/'+owner+'/'+repo, 'PATCH', options, callback);
	};

	scope.forkRepo = function(owner, repo, callback){
		scope.githubApiRequest('/repos/'+owner+'/'+repo+'/forks', 'POST', callback);
	};
}