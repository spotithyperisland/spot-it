// public/js/controllers/NerdCtrl.js
const app = angular.module('NerdCtrl', []);

app.controller('NerdController', function($http) {
    var vm = this;
    vm.names = ["Stockholm", "London", "New York"];

    vm.activity = ["walk", "swim", "run"];

    vm.categories =
    [
    {
      icon: '/background-images/categories/test.jpg',
      name: 'sports',
      /*vm.activities: {
        icon: '/background-images/activities/test.jpg',
        name: 'football',
      }*/
    },
    {
      icon: '/background-images/categories/test.jpg',
      name: 'outdoor',
      /*vm.activities: {
        icon: '/background-images/activities/test.jpg',
        name: 'football',
      }*/
    },
    {
      icon: '/background-images/categories/test.jpg',
      name: 'culture',
      /*vm.activities: {
        icon: '/background-images/activities/test.jpg',
        name: 'football',
      }*/
    }
  ];

  vm.getCategoryName = function() {
    return vm.category[0].name;
  };

// --*******************      SELECT ACTIVITY     *******************--
/* user input for activity ==================
    vm.getActivity = function() {
      vm.userActivity =  storeData.getUserActivity();
    }

    vm.setActivity = function(activity) {
      storeData.setUserActivity(activity);
    }

// --*********************      SELECT CATEGORY     *********************--

app.directive('appInfo', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/appInfo.html'
  };
});

    vm.getCategory = function() {
      vm.userCategory =  storeData.getUserCategory();
    }

    vm.setCategory = function(category) {
      storeData.setUserCategory(category);
    }*/

            // how can I make sure it includes any of them and not just [0]

// --*********************      RESULTS     *********************--

    vm.resultFunction = function() {
      let consumer_key = "qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE";
      let location = {lat: '59.3293', lng: '18.063240'}; // somehow get detail
      let radius = '5'; // user input in km or predefined*
      //let activity = "walk";
      //let category = "park";

       $http.get("https://api.500px.com/v1/photos/search?term="+vm.selectedCategory.name+"&tag="+vm.selectedActivity+"&image_size=%201080&geo="+location.lat+"%2C"+location.lng+"%2C"+radius+"km&consumer_key="+consumer_key)

       .then(function(response) {

           var photos = response.data.photos;
           console.log(vm.selectedCategory.name);
           console.log(vm.selectedActivity);
           console.log(photos);
           for (i = 0; i < photos.length; i++){
             vm.content = photos["0"].images["0"].https_url;

             vm.name = photos["0"].name;
             //console.log(vm.name);
           }
       },
       function(response) {
         vm.content = "Something went wrong";
       });

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
