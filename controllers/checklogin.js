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

function loginCheck(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	db.collection('profile').findOne({
		name: name,
		password: password,
	}, done);
	function done(err, user) {
		if(err) {
			res.json(err);
		}
		if (user) {
			req.session.user = user;
			console.log(user);
			res.render('adding/gamelist', {
				id: 1,
				name: user.name,
			});
		}
		else {
			res.redirect('/login');
		}
	}
}

module.exports = loginCheck;
