const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))
app.set('view engine', 'pug')
app.use('/static', express.static('static'))p

  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/about', function (req, res) {
    res.render('about')
  })

  app.get('/login', function (req, res) {
    res.render('login')
  })

app.use(function notfound(req, res){
  res.status(404);

if (req.accepts('html')) {
  res.render('notfound.pug');
  return;
  }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

