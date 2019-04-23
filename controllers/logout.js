function logout(req, res, next) {
	req.session.destroy(function destroyer(err) {
		if (err) {
			next(err);
		}
		else {
			res.redirect('/');
		}
	});
}

module.exports = logout;
