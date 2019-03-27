/* eslint-disable func-names */
var express = require('express');
var bodyParser = require('body-parser');
var mongod = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

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

express()
	.set('view engine', 'pug')
	.use('/static', express.static('./static'))
	.use(bodyParser.urlencoded({extended: true}))
	.get('/', home)
	.get('/:id', games)
	.post('/', added)
	.use(notFound)
	.listen(3000);

function added(req, res, next) {
	db.collection('profile').updateOne(
		{_id: 1},
		{$set: {gameTags: req.body.game},
		}, done);
	function done(err, data) {
		if (err) {
			next(err);
		}
		else {
			res.redirect('/added');
		}
	}
}

function games(req, res, next) {
	db.collection('profile').findOne({
		_id: 1,
	}, done);
	function done(err, data) {
		console.log(data)
		if (err) {
			next(err);
		}
		else {
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
