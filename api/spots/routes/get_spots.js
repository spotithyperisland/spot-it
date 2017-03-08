// const request = require('request');
const express = require('express');
const router = new express.Router();
const rp = require('request-promise');


router.route('/spots')
	.get((req, res, next) => {
		const term = req.query.term;
		const geo = req.query.geo;

		const options = {
			uri: 'https://api.500px.com/v1/photos/search',
			qs: {
				consumer_key: 'qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE',
				term: term,
				geo: geo,
				exclude: 'Nude,Macro,People,Abstract',
				sort: '_score',
				image_size: '600',
				rpp: '6',
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
			console.log(`There are ${spots.length} spots for ${term} in ${geo}.`);
			res.send(spots);
		})
		.catch((err) => {
			console.log('API call failed...');
		});
	});


module.exports = router;
