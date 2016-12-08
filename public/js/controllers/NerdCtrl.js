// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.names = ["Stockholm", "London", "New York"];
    $scope.category = ["Park", "City", "Lake"];
    $scope.selectedCategory = [];
    $scope.activity = ["Walk", "Swim", "Run"];
    $scope.selectedActivity = [];
    $scope.count = 0;

/* user input for activity ==================
    $scope.getActivity = function() {
      $scope.userActivity =  storeData.getUserActivity();
    }

    $scope.setActivity = function(activity) {
      storeData.setUserActivity(activity);
    }

// user input for category ==================
    $scope.getCategory = function() {
      $scope.userCategory =  storeData.getUserCategory();
    }

    $scope.setCategory = function(category) {
      storeData.setUserCategory(category);
    }*/


// query 500px db for results on click ================
    $scope.resultFunction = function() {
      let consumer_key = "qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE";
      let location = {lat: '59.3293', lng: '18.063240'}; // somehow get detail
      let radius = '5'; // user input in km or predefined*
      //let activity = "walk";
      //let category = "park";

      // how can I make sure it includes any of them and not just [0]

      function isCategory(category, index, array) {
        return category.includes($scope.category);
      }
      if (isCategory($scope.selectedCategory) !== true ){
        console.log('nothing selected');
      } else {
       $http.get("https://api.500px.com/v1/photos/search?term="+$scope.selectedCategory+"&tag="+$scope.selectedActivity+"&image_size=%201080&geo="+location.lat+"%2C"+location.lng+"%2C"+radius+"km&consumer_key="+consumer_key)
       .then(function(response) {

           var photos = response.data.photos;
           console.log($scope.selectedCategory);
           console.log(photos);
           for (i = 0; i < photos.length; i++){
             $scope.content = photos["0"].images["0"].https_url;

             $scope.name = photos["0"].name;
             //console.log($scope.name);
           }
       },
       function(response) {
         $scope.content = "Something went wrong";
       });
      }
  }
})
/*.service("storeData", function(){
  this.setUserActivity = function(activity) {
    this.activity = activity;
  }

  this.setUserCategory = function(category) {
    this.category = category;
  }

  this.getUserActivity = function() {
    return this.activity;
  }

  this.getUserCategory = function() {
    return this.category;
  }
});*/
