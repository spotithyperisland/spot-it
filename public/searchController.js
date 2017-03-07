(function() {
	'use strict';

	const searchController = angular.module('searchController', []);


	searchController.controller('searchController',
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
})();
