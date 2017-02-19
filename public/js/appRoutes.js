// public/js/appRoutes.js
const appRoutes = angular.module('appRoutes', []);

appRoutes.config(['$routeProvider', '$locationProvider',
	($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'MainController',
			})

			.when('/nerds', {
				templateUrl: 'views/nerd.html',
				controller: 'NerdController',
				controllerAs: 'nerdVM',
			})

			.when('/api/spots/:term', {
				templateUrl: 'views/test.html',
				controller: 'TestController',
			});

		$locationProvider.html5Mode(true);
	},
]);
