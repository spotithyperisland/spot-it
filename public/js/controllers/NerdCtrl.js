// public/js/controllers/NerdCtrl.js
const app = angular.module('NerdCtrl', []);

app.controller('NerdController', function($http) {
    var vm = this;
    vm.names = ["Stockholm", "London", "New York"];

    vm.activity = ["walk", "swim", "run"];

    vm.categories =[
    {
      'icon': '/background-images/categories/sport.jpg',
      'name': 'sports',
      'activities':[
        {
          'icon': '/background-images/activities/cycling.jpg',
          'name': 'cycling'},
        {
          'icon': '/background-images/activities/football.jpg',
          'name': 'football'},
        {
          'icon': '/background-images/activities/fishing.jpg',
          'name': 'fishing'},
        {
          'icon': '/background-images/activities/golfing.jpg',
          'name': 'golfing'},
        {
          'icon': '/background-images/activities/gym.jpg',
          'name': 'gym'},
        {
          'icon': '/background-images/activities/skiing.jpg',
          'name': 'skiing'},
        {
          'icon': '/background-images/activities/tennis.jpg',
          'name': 'tennis'},
      ]
    },
    {
      'icon': '/background-images/categories/outdoor.jpg',
      'name': 'outdoor',
      'activities':[
        {
          'icon': '/background-images/activities/archipelago.jpg',
          'name': 'archipelago',
        },
        {
          'icon': '/background-images/activities/birdwatching.jpg',
          'name': 'birdwatching',
        },
        {
          'icon': '/background-images/activities/camping.jpg',
          'name': 'camping',
        },
        {
          'icon': '/background-images/activities/climbing.jpg',
          'name': 'climbing',
        },
        {
          'icon': '/background-images/activities/dogpark.jpg',
          'name': 'dogpark',
        },
        {
          'icon': '/background-images/activities/grill.jpg',
          'name': 'grill',
        },
        {
          'icon': '/background-images/activities/horsebackriding.jpg',
          'name': 'horsebackriding',
        },
        {
          'icon': '/background-images/activities/hunting.jpg',
          'name': 'hunting',
        },
        {
          'icon': '/background-images/activities/iceskating.jpg',
          'name': 'iceskating',
        },
        {
          'icon': '/background-images/activities/kayaking.jpg',
          'name': 'kayaking',
        },
        {
          'icon': '/background-images/activities/mushroompicking.jpg',
          'name': 'mushroompicking',
        },
        {
          'icon': '/background-images/activities/northernlight.jpg',
          'name': 'northernlight',
        },
        {
          'icon': '/background-images/activities/park.jpg',
          'name': 'park',
        },
        {
          'icon': '/background-images/activities/parking.jpg',
          'name': 'parking',
        },
        {
          'icon': '/background-images/activities/picnic.jpg',
          'name': 'picnic',
        },
        {
          'icon': '/background-images/activities/running.jpg',
          'name': 'running',
        },
        {
          'icon': '/background-images/activities/skateing.jpg',
          'name': 'skateing',
        },
        {
          'icon': '/background-images/activities/surfing.jpg',
          'name': 'surfing',
        },
        {
          'icon': '/background-images/activities/swimming.jpg',
          'name': 'swimming',
        },
        {
          'icon': '/background-images/activities/walking.jpg',
          'name': 'walking',
        },
      ]
    },
    {
      'icon': '/background-images/categories/sport.jpg',
      'name': 'lesiure',
      'activities':[
        {
          'icon': '/background-images/activities/dating.jpg',
          'name': 'dating'},
        {
          'icon': '/background-images/activities/festival.jpg',
          'name': 'festival'},
        {
          'icon': '/background-images/activities/reading.jpg',
          'name': 'reading'},
        {
          'icon': '/background-images/activities/rollerskating.jpg',
          'name': 'rollerskating'},
        {
          'icon': '/background-images/activities/stargazing.jpg',
          'name': 'stargazing'},
        {
          'icon': '/background-images/activities/sunset.jpg',
          'name': 'sunset'},
        {
          'icon': '/background-images/activities/viewpont.jpg',
          'name': 'viewpont'},
          {
            'icon': '/background-images/activities/waterfall.jpg',
            'name': 'waterfall'},
      ]
    },
  ];

// --*********************      RESULTS     *********************--

    vm.resultFunction = function() {
      let consumer_key = "qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE";
      let location = {lat: '59.3293', lng: '18.063240'}; // somehow get detail
      let radius = '5'; // user input in km or predefined*
      //let activity = "walk";
      //let category = "park";

       $http.get("https://api.500px.com/v1/photos/search?term="+vm.selectedCategory.name+"&tag="+vm.selectedActivity.name+"&image_size=%201080&geo="+location.lat+"%2C"+location.lng+"%2C"+radius+"km&consumer_key="+consumer_key)

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
