(function() {
	'use strict';

	const locationFactory = angular.module('locationFactory', []);


	locationFactory.factory('locationFactory', ['$http', 'userService',
		function($http, userService) {
			const location = {};

			location.get = function(callback) {
				const city = userService.getCity();

				$http.get('api/location?city=' + city)
				.then(function(response) {
					if (callback) {
						callback(response.data);
					}
				});
			};
			return location;
		}]);
})();
