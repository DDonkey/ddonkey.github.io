var DD = DD || angular.module('DD',['ngRoute']);

DD.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/auth', {
			templateUrl: 'views/auth.html',
			controller: 'AuthController'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);