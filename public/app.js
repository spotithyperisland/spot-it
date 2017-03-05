(function() {
	'use strict';

	const spots = angular.module('spots', ['ngRoute']);


	spots.service('userService', function UserService() {
		this.save = function(name, email, term, city) {
			this.name = name;
			this.email = email;
			this.term = term;
			this.city = city;
		};
		this.getCity = function() {
			return this.city;
		};
		this.getTerm = function() {
			return this.term;
		};
	});


	spots.factory('locationFactory', ['$http', 'userService',
		function($http, userService) {
			const location = {};

			location.get = function(callback) {
				const city = userService.getCity();

				$http.get('http://localhost:3000/api/location?city=' + city)
				.then(function(response) {
					if (callback) {
						callback(response.data);
					}
				});
			};
			return location;
		}]);


	spots.factory('spotsFactory', ['$http', 'userService', 'locationFactory',
		function spotsFactory($http, userService, myLocation) {
			const spots = {};
			const location = {};

			spots.get = function(callback) {
				const term = userService.getTerm();

				myLocation.get(function(data) {
					location.lat = data.lat;
					location.lng = data.lng;
					location.radius = 5;

					const geo = location.lat + ',' + location.lng + ',' + location.radius;

					$http.get('http://localhost:3000/api/spots?term=' + term + '&geo=' + geo)
					.then(function(response) {
						if (callback) {
							callback(response.data);
						}
					});
				});
			};

			return spots;
		}]);


	spots.controller('homeController', ['$scope', function($scope) {
		$scope.tagline = 'Explore';
	}]);


	spots.controller('searchController', ['$scope', 'userService', 'locationFactory', 'spotsFactory',
		function($scope, userService, myLocation, spotsFactory) {
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


	spots.controller('spotsController', ['$scope', 'userService', 'spotsFactory',
		function($scope, userService, spotsFactory) {
			$scope.getSpots = function() {
				spotsFactory.get(function(data) {
					$scope.spots = data;
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
			templateUrl: 'search.html',
			controller: 'searchController',
		})
		.when('/spots', {
			templateUrl: 'spots.html',
			controller: 'spotsController',
		});

		$locationProvider.html5Mode(true);
	});
})();
