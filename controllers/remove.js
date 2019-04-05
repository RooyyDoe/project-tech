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

// Delete a gameTag
function remove(req, res, next) {
	// Gets the name of the deleted game out of the URL (:gname)
	var name = req.params.gname;
	// Gets the profile again, so that the game can be removed and filtered out of that array
	db.collection('profile').findOne({
		_id: 1,
		// Runs the done function after the query
	}, function done(err, data) {
		// runs the performRemove function, This has been placed in a separate function to promote readability
		performRemove(data.gameTags, name, res);
	});

}

function performRemove(gameTags, name, res) {
	// Again checks if gameTags is an array or a string, so multiple or one game selected
	if(typeof gameTags === 'object') {

		// Go through all entries in the gameTags array and see if the name corresponds to the to be deleted
		// game. If this is the case, g !== indicates that the name is false. This means that it is not placed
		// in the filteredTags array. with 'true' this does happen (so you get true by the gameTags that do not 
		// match the games to be deleted.)
		var filteredTags = [];
		filteredTags = gameTags.filter(function done(g) {
			return g !== name;
		});
	}
	else {
		// the game you want to delete is the only game you have. So then no check needs to be done. 
		// Because you only have one game and you want to delete it.
		filteredTags = '';
	}

	// Run a new query that updates the profile, replacing the gameTags list with the list that is filtered
	// then redirect back to the page
	db.collection('profile').updateOne(
		{_id: 1},
		{ $set: {gameTags: filteredTags},
		}, function done(err, data) {
			if (err) {
				next(err);
			}
			else {
				res.json({status: 'ok'});
			}
		});
}

module.exports = remove;
