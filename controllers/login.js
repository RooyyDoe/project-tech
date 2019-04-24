/* eslint-disable func-names */
var mongod = require('mongodb');

require('dotenv').config();

// Database information
var db = null;
var url = process.env.MONGODB_URI;

mongod.MongoClient.connect(url, {
	useNewUrlParser: true,
}, function(err, client) {
	if (err) {throw err;}
	db = client.db('GameMate');
});

function renderLogin(req, res, data) {
	if (req.session.user) {
		res.render('account/login', {
			data: data,
			user: req.session.user,
		});
	}
	else {
		res.render('account/login', {
			data: data,
			user: req.session.user,
		});
	}
}

module.exports = renderLogin;
