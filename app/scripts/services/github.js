'use strict';

/**
 * @ngdoc service
 * @name ddonkeyApp.github
 * @description
 * # github
 * Service in the ddonkeyApp.
 */
angular.module('ddonkeyApp')
  .service('github', ['$http', function github($http) {
    // AngularJS will instantiate a singleton by calling "new" on this functionthis
    this.token = '';
    this.githubApiRequest = function(uri, method, parameter){
        if(typeof(method)!=='string'){
            parameter = method;
            method = 'GET';
        }
        if(typeof(parameter) ==='function'){
            parameter = {};
        }
        else{
            parameter = parameter?parameter:{};
        }

        parameter = JSON.stringify(parameter);

        var url = 'https://api.github.com'+uri;

        var req = {
            url: url,
            type: method,
            data: parameter,
            dataType: 'json',
            headers: {
                Authorization: 'token '+ this.token
            },
            contentType: 'application/json; charset=utf-8',
        };

        return $http(req);
    };

    this.githubAPISlim = function(url, method, parameter) {
        parameter = parameter?parameter:{};
        var req = {
            url: url,
            type: method,
            data: parameter,
            headers: {
                Authorization: 'token '+ this.token
            }
        };

        return $http(req);
    };

    this.getAuthURL = function(cliendId, thiss){
        var authBase = 'https://github.com/login/oauth/authorize';
        var parameter = {
            'client_id': cliendId,
            this: thiss.join(',')
        };
        var q = '';
        for(var key in parameter){
            if(q){
                q += '&';
            }
            q += key+'='+parameter[key];
        }
        return authBase+'?'+q;
    };

    this.getUserInfo = function(){
        return this.githubApiRequest('/user');
    };

    this.getRepoList = function(){
        return this.githubApiRequest('/user/repos');
    };

    this.createRepo = function(options){
        return this.githubApiRequest('/user/repos', 'POST', options);
    };

    this.getContent = function(owner, repo, path){
        return this.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path || '');
    };

    this.getBlobs = function(url) {
        return this.githubAPISlim(url, 'Get');
    }

    this.createFile = function(owner, repo, path, options){
        return this.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path, 'PUT', options);
    };

    this.deleteFile = function(owner, repo, path, options){
        return this.githubApiRequest('/repos/'+owner+'/'+repo+'/contents/'+path, 'DELETE', options);
    };

    this.editRepo = function(owner, repo, options){
        return this.githubApiRequest('/repos/'+owner+'/'+repo, 'PATCH', options);
    };

    this.forkRepo = function(owner, repo){
        return this.githubApiRequest('/repos/'+owner+'/'+repo+'/forks', 'POST');
    };
  }]);
