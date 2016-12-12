// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

        $scope.names = ["Stockholm"/*, "London", "New York"*/];

        $scope.categoryList = [];
        $scope.category = ["Park", "City", "Lake"];

        $scope.changedCategory = function(item) {
                $scope.categoryList.push(item);
            }
            // console.log('Does it change?', $scope.selectedCategory);
        $scope.activityList = [];
        $scope.activity = ["Walk", "Swim", "Run"];

        $scope.changedActivity = function(item) {
                $scope.activityList.push(item);
            }

        // query 500px db for results on click ================
        $scope.resultFunction = function() {
            let consumer_key = "qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE";
            let location = {
                lat: '59.3293',
                lng: '18.063240'
            }; // somehow get detail
            let radius = '5'; // user input in km or predefined*
            //let activity = "walk";
            //let category = "park";

            // how can I make sure it includes any of them and not just [0]

            // select-options ===============================================
            //console.log($scope.categoryList.length);
            //console.log($scope.activityList);
            if ($scope.categoryList.length && $scope.activityList.length !== 0) {
                $http.get("https://api.500px.com/v1/photos/search?term=" + $scope.categoryList + "&tag=" + $scope.activityList + "&image_size=%201080&geo=" + location.lat + "%2C" + location.lng + "%2C" + radius + "km&consumer_key=" + consumer_key)
                    .then(function(response) {

                            var photos = response.data.photos;
                            //console.log($scope.selectedCategory);
                            //console.log(photos);
                            for (i = 0; i < photos.length; i++) {
                                $scope.content = photos["0"].images["0"].https_url;

                                $scope.name = photos["0"].name;
                                //console.log($scope.name);
                            }
                        },
                        function(response) {
                            $scope.content = "Something went wrong";
                        });
            }
            else {
                $scope.errorMessage = 'error message';
                console.log('error message');
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
