(function() {
	'use strict';

	const featureSpotController = angular.module('featureSpotController', []);


	featureSpotController.controller('featureSpotController',
		['$scope', '$sce', 'spotService', function($scope, $sce, spotService) {
			$scope.spot = spotService.getImage();
			$scope.title = spotService.getTitle();
			$scope.location = spotService.getLocation();
			$scope.photographer = spotService.getPhotographer();
			const location = spotService.getLocation().lat+','+spotService.getLocation().lng;
			const mapsApi = 'https://www.google.com/maps/embed/v1/view?';
			const key = 'key=AIzaSyACYVVO0xT6P2S6MfZtSXFxhELE80W2DSg';
			$scope.map = $sce.trustAsResourceUrl(mapsApi+key+'&center='+location+'&zoom=18');
		}]);
})();
