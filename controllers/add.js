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

// Function made for adding the chosen gameTags to the database tabel
function addGameTag(req, res, next) {
	if (req.session.user) {
		// Query made for updating a attribute in the "profile" tabel
		db.collection('profile').updateOne(
			{_id: 1},
			// Setting the gameTags input on what gets chosen in the interface.
			{$set: {gameTags: req.body.game},
				// Runs the done function, Error or redirect
			}, done);
	}
	else {
		res.status(401).render('account/credsrequired.pug');
	}

	function done(err) {
		if (err) {
			next(err);
		}
		else {
			res.redirect('/add');
		}
	}
}

module.exports = addGameTag;
