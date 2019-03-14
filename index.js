const express = require('express')

express() 
    .set('view engine', 'pug')
    .use('/static', express.static('static'))
    .get('/about', about)
    .get('/', home)
    .get('/login', login)
    .use(notFound)
    .listen(3000)

    function home(req, res) {
      res.render('index')
    }

    function about(req, res) {
      res.render('about')
    }

    function login(req, res) {
      res.render('login')
    }

function notFound(req, res) {
  res.status(404).render('notfound.pug')
}

