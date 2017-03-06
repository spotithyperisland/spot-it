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


	spots.factory('spotsFactory',
		['$http', 'userService', 'locationFactory',
			function spotsFactory($http, userService, myLocation) {
				const spots = {};
				const location = {};

				spots.get = function(callback) {
					const term = userService.getTerm();

					myLocation.get(function(data) {
						location.lat = data.lat;
						location.lng = data.lng;
						location.rad = 5;

						const geo = location.lat + ',' + location.lng + ',' + location.rad;

						$http.get('http://localhost:3000/api/spots?term=' + term + '&geo=' + geo)
						.then(function(response) {
							spots.result = response.data;
							if (callback) {
								callback(response.data);
							}
						});
					});
				};

				return spots;
			}]);


	spots.factory('featureSpotsFactory', ['$http',
		function spotsFactory($http) {
			const spots = {};

			spots.get = function(callback) {
				$http.get('http://localhost:3000/api/feature_spots')
				.then(function(response) {
					if (callback) {
						callback(response.data);
					}
				});
			};

			return spots;
		}]);


	spots.controller('homeController', ['$scope', function($scope) {
		$scope.tagline = 'Explore';
	}]);


	spots.controller('searchController',
		['$scope', 'userService', 'spotsFactory', 'featureSpotsFactory',
			function($scope, userService, spotsFactory, featureSpotsFactory) {
				$scope.master = {};

				$scope.update = function(user) {
					$scope.master = angular.copy(user);

					userService.save(user.name, user.email, user.term, user.city);

					spotsFactory.get();
				};

				$scope.getFeatureSpots = function() {
					featureSpotsFactory.get();
				};

				$scope.reset = function() {
					$scope.user = angular.copy($scope.master);
				};

				$scope.reset();
			}]);


	spots.controller('spotsController',
		['$scope', 'spotsFactory',
			function($scope, spotsFactory) {
				spotsFactory.get(function(data) {
					$scope.spots = data;
				});
			}]);


	spots.controller('featureSpotsController',
		['$scope', 'featureSpotsFactory',
			function($scope, featureSpotsFactory) {
				featureSpotsFactory.get(function(data) {
					console.log(data);
					$scope.spots = data;
				});
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
		})
		.when('/feature_spots', {
			templateUrl: 'feature_spots.html',
			controller: 'featureSpotsController',
		});

		$locationProvider.html5Mode(true);
	});
})();
