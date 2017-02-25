(function() {
	'use strict';

	const spots = angular.module('spots', ['ngRoute']);


	spots.controller('homeController', ['$scope', function($scope) {
		$scope.tagline = 'Explore';
	}]);


	spots.service('userService', function UserService() {
		this.save = function(name, email, term, city) {
			this.name = name;
			this.email = email;
			this.term = term;
			this.city = city;
		};

		this.getUser = function() {
			return this.term;
		};
	});


	spots.controller('searchController', ['$scope', 'userService',
		function($scope, userService) {
			$scope.master = {};

			$scope.update = function(user) {
				$scope.master = angular.copy(user);
				userService.save(user.name, user.email, user.term, user.city);
			};

			$scope.reset = function() {
				$scope.user = angular.copy($scope.master);
			};

			$scope.reset();
		}]);


	spots.controller('spotsController', ['$scope', '$http', 'userService',
		function($scope, $http, userService) {
			$scope.getSpots = function() {
				const term = userService.getUser();

				$http.get('http://localhost:3000/api/spots/' + term)
				.then(function(response) {
					$scope.spots = response.data;
				});
			};
		}]);


	spots.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'homeController',
		})
		.when('/search-flow', {
			templateUrl: 'search-flow.html',
			controller: 'searchController',
		})
		.when('/spots', {
			templateUrl: 'spots.html',
			controller: 'spotsController',
		});

		$locationProvider.html5Mode(true);
	});
})();
