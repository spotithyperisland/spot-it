(function() {
	'use strict';

	const userService = angular.module('userService', []);


	userService.service('userService', function UserService() {
		this.save = function(name, email, term, city) {
			this.name = name;
			this.email = email;
			this.term = term;
			this.city = city;
		};
		this.getCity = function() {
			return this.city;
		};
		this.getTerm = function() {
			return this.term;
		};
	});
})();
