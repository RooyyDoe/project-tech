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

function profile(req, res) {
	if(req.session.user) {
	// Query that was made to find the profile with _id: 1
		db.collection('profile').findOne({
			_id: 1,
		// Runs the done function after the query
		}, done);
	}
	else {
		res.status(401).render('account/credsrequired.pug');
	}

	function done(err, data) {
		if (err) {
			next(err);
		}
		else {
			// Giving data through with the res.render
			res.render('profile/profile.pug', {data: data});
		}
	}
}

module.exports = profile;
