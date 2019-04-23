var mongod = require('mongodb');

// Database information
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongod.MongoClient.connect(url, { useNewUrlParser: true }, function connection(err, client) {
	if (err) {
		throw err;
	}
	db = client.db(process.env.DB_NAME);
});

// Function made for getting the data that was added to the database with the first function
function overview(req, res, next) {
	if (req.session.user) {
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
		console.log(data);
		if (err) {
			next(err);
		}
		else {
			// Giving data through with the res.render
			res.render('adding/add', {data: data});
		}
	}
}

module.exports = overview;
