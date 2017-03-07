(function() {
	'use strict';

	const featureSpotsController = angular.module('featureSpotsController', []);


	featureSpotsController.controller('featureSpotsController',
		['$scope', 'featureSpotsFactory',
			function($scope, featureSpotsFactory) {
				featureSpotsFactory.get(function(data) {
					$scope.spots = data;
				});
			}]);
})();
