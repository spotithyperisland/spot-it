// const request = require('request');
const express = require('express');
const router = new express.Router();
const rp = require('request-promise');

// Geocoding is a time and resource intensive task. Whenever possible,
// pre-geocode known addresses (using the Google Maps Geocoding API described
// here or another geocoding service), and store your results in a temporary
// cache of your own design.

router.route('/location')
	.get((req, res, next) => {
		const city = req.query.city;
		const country = req.query.country;

		const options = {
			uri: 'https://maps.googleapis.com/maps/api/geocode/json',
			qs: {
				address: city,
				components: country,
				key: 'AIzaSyAsPDZv8AivYTanZWiTMTr-SuKivpYboqM',
			},
			headers: {
				'User-Agent': 'Request-Promise',
			},
			json: true,
		};

		rp(options)
		.then((result) => {
			const location = result.results[0].geometry.location;
			console.log(`For ${city}, the coordinates are ${location.lat},
				${location.lng}.`);
			res.send(location);
		})
		.catch((err) => {
			console.log('API call failed...', err);
		});
	});


module.exports = router;
