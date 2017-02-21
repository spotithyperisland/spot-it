// public/js/services/NerdService.js
const spotServiceModule = angular.module('NerdService', []);

spotServiceModule.factory('Nerd', ['$http', function($http) {
	return {

		get: function() {
			return $http.get('/api/nerds');
		},

	};
}]);
