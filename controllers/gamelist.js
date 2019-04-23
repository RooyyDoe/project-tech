function gamelist(req, res) {
	if(req.session.user) {
		res.render('adding/gamelist.pug');
	}
	else {
		res.status(401).render('account/credsrequired.pug');
	}
}

module.exports = gamelist;
