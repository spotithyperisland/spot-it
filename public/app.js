(function() {
	'use strict';

	const spots = angular.module('spots', ['ngRoute']);

	spots.controller('spotsController', function($scope, $http) {
		$http.get('http://localhost:3000/api/spots/city')
			.then(function(response) {
				$scope.spots = response.data;
			});
	});

	spots.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			// controller: 'spotsController',
		})
		.when('/spots', {
			templateUrl: 'spots.html',
			controller: 'spotsController',
		});

		$locationProvider.html5Mode(true);
	});
})();
