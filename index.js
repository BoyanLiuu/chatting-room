var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var http =  require('http');


var app = express();
// Middle ware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  }));
  app.set('view engine', 'hbs');
  app.use('/public', express.static('public'));


  app.get('/', function (req, res) {

    res.render('index');
  });



  app.listen(3000, function () {
    console.log('Listening on port 3000!');
  });