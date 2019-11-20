var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var userRouter = require('./routes/userRoutes');
var homeRouter = require('./routes/homeRoutes');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var passport =  require('passport');
var flash = require('connect-flash');
var expressSession =  require('express-session');
mongoose.Promise = global.Promise;

// Load envirorment variables
dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABSE;
// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

  require('./passport/passport-local')(passport);
  require('./passport/passport-facebook')(passport);
//set up express app.
var app = express();



//these following two line required to use flash message , need to put before  passport.initialize.
app.use(expressSession({secret:'Boyan|Ivy',saveUninitialized:false,resave:false}));
app.use(flash());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//it have to put before router

// use express.Router
app.use('/', userRouter);
app.use('/', homeRouter);
//view engine setup


app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.use('/public', express.static('public'));


//Routes
app.get('/', function (req, res) {
  res.render('index');
 
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});