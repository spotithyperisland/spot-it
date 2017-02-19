// public/js/controllers/MainCtrl.js
const home = angular.module('MainCtrl', []);

home.controller('MainController', ['$scope', function($scope) {
	$scope.tagline = 'Explore';
}]);
