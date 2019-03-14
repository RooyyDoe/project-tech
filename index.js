const express = require('express')
const app = express()
const port = 3000


app.
    use(express.static('static'))
    set('view engine', 'pug')
    use('/static', express.static('static'))

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

app.listen(port, function whichPort(){
  console.log(`Example app listening on port ${port}!`)
}

