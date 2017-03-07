(function() {
	'use strict';

	const featureSpotsFactory = angular.module('featureSpotsFactory', []);


	featureSpotsFactory.factory('featureSpotsFactory', ['$http',
		function spotsFactory($http) {
			const spots = {};

			spots.get = function(callback) {
				$http.get('api/feature_spots')
				.then(function(response) {
					if (callback) {
						callback(response.data);
					}
				});
			};

			return spots;
		}]);
})();
