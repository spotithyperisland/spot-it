(function() {
	'use strict';

	const spotsFactory = angular.module('spotsFactory', []);


	spotsFactory.factory('spotsFactory',
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
})();
