(function() {
	'use strict';

	const spotsController = angular.module('spotsController', []);


	spotsController.controller('spotsController',
		['$scope', 'spotsFactory', 'spotService',
			function($scope, spotsFactory, spotService) {
				spotsFactory.get(function(data) {
					$scope.spots = data;
				});

				$scope.getSpot = function(spot) {
					const location = {
						lat: spot.latitude,
						lng: spot.longitude,
						city: spot.location_details.city[0],
						country: spot.location_details.country[0],
					};

					const photographer = spot.user.fullname;

					const image = spot.images[0].https_url;

					const title = spot.name;

					const tags = spot.tags;

					spotService.save(image, location, title, tags, photographer);
				};
			}]);
})();
