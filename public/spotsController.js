(function() {
	'use strict';

	const spotsController = angular.module('spotsController', []);


	spotsController.controller('spotsController',
		['$scope', 'spotsFactory',
			function($scope, spotsFactory) {
				spotsFactory.get(function(data) {
					$scope.spots = data;
				});
			}]);
})();
