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
          'name': 'landscape',
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
      'icon': '/background-images/categories/culture.jpg',
      'name': 'leisure',
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
    function relevantTag(tag) {
    return tag >= 10;
    }


    vm.resultFunction = function() {
      const consumer_key = 'qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE';
      const term = 'city'; // keyword
      const tag = 'travel';
      const exclude = 'Nude,Macro,People,Abstract';
      const sort = '_score';
      const tags = 'travel';
      const imageSize = '%201080';
      const location = {lat: '59.3293', lng: '18.0686'}; // Stockholm
      // const location = {lat: '49.2827', lng: '123.1207'}; // Vancouver
      const radius = '5'; // user input in km or predefined*
      const numberOfResults = '25';

       $http.get('https://api.500px.com/v1/photos/search?term='+term+'exclude='+exclude+'&rpp='+numberOfResults+'&image_size='+imageSize+'&geo='+location.lat+'%2C'+location.lng+'%2C'+radius+'&sort='+sort+'&tags=1&consumer_key='+consumer_key)
       .then(function(response) {
         const photos = response.data.photos;
        //  console.log(photos.length);
         let allTags = [];

         for (let i = 0; i < photos.length; ++i) {
           let tagArray = photos[i].tags;
           console.log(tagArray);
           for (let i = 0; i < tags.length; ++i) {
             let tags = tagArray[i];
             allTags.push(tags)
           }
         }

        //  console.log(photos);
        //  console.log(allTags);

         allTags.sort();

         var current = null;
         let tagName = [];
         let tagCount = [];
          var cnt = 0;
          for (var i = 0; i < allTags.length; i++) {
            if (allTags[i] != current) {
                if (cnt > 0) {
                  tagName.push(current);
                  tagCount.push(cnt);
                  // console.log({[current]: cnt});
                    // console.log(current + ' used --> ' + cnt + ' times');
                }
                current = allTags[i];
                cnt = 1;
            } else {
                cnt++;
            }
          }
          if (cnt > 0) {
            let group = {
              current: cnt
            }
            // console.log(current + ' used --> ' + cnt + ' times');
          }

          let tagResults = {
            category: tagName,
            count: tagCount,
          }
          console.log(tagResults);
          // console.save(tagResults,'Travel');

         for (i = 0; i < photos.length; ++i){
          vm.content = photos[0].images[0].https_url;
          vm.resultData = photos;
          vm.name = photos["0"].name;
          // console.log(vm.resultData);
          //  console.log(vm.content);
         }
       },
       function(response) {
         vm.content = "Something went wrong";
       });

       (function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

  }
})
