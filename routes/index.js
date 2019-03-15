const express = require('express')

express() 
    .set('view engine', 'pug')
    .use('/static', express.static('static'))
    .get('/', home)
    .use(notFound)
    .listen(3000)

    function home(req, res) {
      res.render('index')
    }

function notFound(req, res) {
  res.status(404).render('notfound.pug')
}

