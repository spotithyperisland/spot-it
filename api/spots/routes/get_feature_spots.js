// const request = require('request');
const express = require('express');
const router = new express.Router();
const rp = require('request-promise');


router.route('/feature_spots')
	.get((req, res, next) => {
		const options = {
			uri: 'https://api.500px.com/v1/photos',
			qs: {
				consumer_key: 'qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE',
				feature: 'popular',
				exclude: 'Nude,Macro,People,Abstract,Black and White',
				// sort: 'times_viewed',
				image_size: '600',
				rpp: '12',
				tags: 1,
			},
			headers: {
				'User-Agent': 'Request-Promise',
			},
			json: true,
		};

		rp(options)
		.then((result) => {
			const spots = result['photos'];

			const hasLocation = (item) => {
				return item.latitude !== null;
			};

			const filteredSpots = spots.filter(hasLocation);

			console.log(`There are ${spots.length} feature spots and
				${filteredSpots.length} have locations.`);
			res.send(filteredSpots);
		})
		.catch((err) => {
			console.log('API call failed...', err);
		});
	});


module.exports = router;
