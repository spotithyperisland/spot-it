(function() {
	'use strict';

	const spots = angular.module('spots', []);

	spots.controller('spotsController', function($scope, $http) {
		$http.get('http://localhost:3000/api/spots/city')
			.then(function(response) {
				$scope.spots = response.data;
			});
	});
})();
