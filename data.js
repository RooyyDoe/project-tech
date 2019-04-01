// Bronnen:
// https://github.com/cmda-bt/be-course-18-19
// https://docs.mongodb.com/meta/

/* eslint-disable func-names */
// Require all the different packages that I use.
var express = require('express');
var bodyParser = require('body-parser');
var mongod = require('mongodb');
require('dotenv').config();

// Intialize connection to MongoDB database
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
mongod.MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
	if (err) {
		throw err;
	}
	db = client.db(process.env.DB_NAME);
});

// This are all the routes that are in use.
express()
	.set('view engine', 'pug')
	.use('/static', express.static('./static'))
	.use(bodyParser.urlencoded({extended: true}))
	.get('/', home)
	.get('/:id', games)
	.post('/', added)
	.use(notFound)
	.listen(3000);

// Function made for adding the chosen gameTags to the database tabel
function added(req, res, next) {
	// Query made for updating a attribute in the "profile" tabel
	db.collection('profile').updateOne(
		{_id: 1},
		// Setting the gameTags input on what gets chosen in the interface.
		{$set: {gameTags: req.body.game},
		// Runs the done function, Error or redirect
		}, done);
	function done(err) {
		if (err) {
			next(err);
		}
		else {
			res.redirect('/added');
		}
	}
}
// Function made for getting the data that was added to the database with the first function
function games(req, res, next) {
	// Query that was made to find the profile with _id: 1
	db.collection('profile').findOne({
		_id: 1,
		// Runs the done function after the query
	}, done);
	function done(err, data) {
		console.log(data);
		if (err) {
			next(err);
		}
		else {
			// Giving data through with the res.render
			res.render('adding/added', {data: data});
		}
	}
}

function home(req, res) {
	res.render('adding/index.pug');
}

function notFound(req, res) {
	res.status(404).render('partials/notfound.pug');
}
