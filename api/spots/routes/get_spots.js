// const request = require('request');
const express = require('express');
const router = new express.Router();
const rp = require('request-promise');


router.route('/:term')
	.get((req, res, next) => {
		const term = req.params.term;

		const options = {
			uri: 'https://api.500px.com/v1/photos/search',
			qs: {
				consumer_key: 'qzAmxoU2zfeuiIS4hIDJCOs49aUWAWgqoVyYo0PE',
				term: term,
				// geo: '59.3293,18.0686,5',
				geo: '49.2827,-123.1207,5',
				exclude: 'Nude,Macro,People,Abstract',
				sort: '_score',
				image_size: '600',
				rpp: '6',
			},
			headers: {
				'User-Agent': 'Request-Promise',
			},
			json: true,
		};

		rp(options)
		.then((result) => {
			const spots = result['photos'];
			console.log(`There are ${spots.length} spots for ${term}.`);
			res.send(spots);
		})
		.catch((err) => {
			console.log('API call failed...');
		});
	});


module.exports = router;