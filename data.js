// Bronnen:
// https://github.com/cmda-bt/be-course-18-19
// https://docs.mongodb.com/meta/

// Require all the different packages that I use.
var express = require('express');
var bodyParser = require('body-parser');
var mongod = require('mongodb');
var session = require('express-session');

require('dotenv').config();

// Intialize connection to MongoDB database
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongod.MongoClient.connect(url, { useNewUrlParser: true }, function connection(err, client) {
	if (err) {
		throw err;
	}
	db = client.db(process.env.DB_NAME);
});

// Require controllers

var add = require('./controllers/add.js');
var overview = require('./controllers/overview.js');
var profile = require('./controllers/profile.js');
var remove = require('./controllers/remove.js');

// This are all the routes that are in use.
express()
	.set('view engine', 'pug')
	.use('/static', express.static('./static'))
	.use(bodyParser.urlencoded({extended: true}))
	.get('/', home)
	.get('/profile', profile)
	.get('/:id', overview)
	.post('/', add)
	.delete('/:gname', remove)
	.use(notFound)
	.listen(3000);

function home(req, res) {
	res.render('adding/index.pug');
}

function notFound(req, res) {
	res.status(404).render('partials/notfound.pug');
}
