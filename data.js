/* eslint-disable func-names */
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
var url = process.env.MONGODB_URI;

mongod.MongoClient.connect(url, {
	useNewUrlParser: true,
}, function(err, client) {
	if (err) {throw err;}
	db = client.db('GameMate');
});

// Require controllers

var addGameTag = require('./controllers/add.js');
var overview = require('./controllers/overview.js');
var profile = require('./controllers/profile.js');
var remove = require('./controllers/remove.js');
var logout = require('./controllers/logout.js');
var loginCheck = require('./controllers/checklogin.js');
var renderLogin = require('./controllers/login.js');
var renderCreds = require('./controllers/credsrequired.js');
var gamelist = require('./controllers/gamelist.js');

// This are all the routes that are in use.
express()
	.set('view engine', 'pug')
	.use('/static', express.static('./static'))
	.use(bodyParser.urlencoded({
		extended: true,
	}))
	.use(bodyParser.json())
	.use(session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
	}))
	// Homepage
	.get('/', home)
	.get('/credsrequired', renderCreds)
	// Account
	.get('/login', renderLogin)
	.post('/login', loginCheck)
	.get('/logout', logout)
	// GameList
	.get('/gamelist', gamelist)
	// Profile
	.get('/profile', profile)
	.get('/:id', overview)
	.post('/', addGameTag)
	.delete('/:gname', remove)
	// 404 page
	.use(notFound)
	.listen(process.env.PORT || 3000)

function home(req, res) {
	res.render('adding/index.pug');
}

function notFound(req, res) {
	res.status(404).render('partials/notfound.pug');
}
