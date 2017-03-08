(function() {
	'use strict';

	const spotService = angular.module('spotService', []);


	spotService.service('spotService', function SpotService() {
		this.save = function(image, location, title, tags, photographer) {
			this.image = image;
			this.location = location;
			this.title = title;
			this.tags = tags;
			this.photographer = photographer;
		};
		this.getImage = function() {
			return this.image;
		};
		this.getTitle = function() {
			return this.title;
		};

		this.getPhotographer = function() {
			return this.photographer;
		};

		this.getLocation = function() {
			return this.location;
		};
	});
})();
