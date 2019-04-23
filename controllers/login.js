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
