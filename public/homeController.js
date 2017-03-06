(function() {
	'use strict';

	const homeController = angular.module('homeController', []);


	homeController.controller('homeController', ['$scope', function($scope) {
		$scope.tagline = 'Explore';
	}]);
})();
