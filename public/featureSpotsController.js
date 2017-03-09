(function() {
	'use strict';

	const featureSpotsController = angular.module('featureSpotsController', []);


	featureSpotsController.controller('featureSpotsController',
		['$scope', 'featureSpotsFactory', 'spotService',
			function($scope, featureSpotsFactory, spotService) {
				featureSpotsFactory.get(function(data) {
					$scope.spots = data;
				});

				$scope.getSpot = function(spot) {
					const location = {
						lat: spot.latitude,
						lng: spot.longitude,
					};

					const photographer = spot.user.fullname;

					const image = spot.images[0].https_url;

					const title = spot.name;

					const tags = spot.tags;

					spotService.save(image, location, title, tags, photographer);
				};
			}]);
})();
