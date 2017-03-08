(function() {
	'use strict';

	const routes = angular.module('routes', []);

	routes.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'homeController',
		})
		.when('/search-flow', {
			templateUrl: 'search.html',
			controller: 'searchController',
		})
		.when('/spots', {
			templateUrl: 'spots.html',
			controller: 'spotsController',
		})
		.when('/feature_spots', {
			templateUrl: 'feature_spots.html',
			controller: 'featureSpotsController',
		})
		.when('/spot', {
			templateUrl: 'spot.html',
			controller: 'spotController',
		});

		$locationProvider.html5Mode(true);
	});
})();
