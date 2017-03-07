// import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// route app
app.use('/api', require('./api/spots/routes/get_spots'));
app.use('/api', require('./api/spots/routes/get_location'));
app.use('/api', require('./api/spots/routes/get_feature_spots'));

// start test server
app.listen(port, hostname, (err) => {
	if (err) {
		console.log(err);
	}

	console.log(`Server is running at http://${hostname}:${port}`);
});

// start production server
app.listen(port, function() {
	console.log(`Spot It is running on http://localhost: + ${port}`);
});
