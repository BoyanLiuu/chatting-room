const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homeRoutes');
const groupRouter = require('./routes/groupRoutes');
const apiRouter = require('./routes/apiRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport =  require('passport');
const flash = require('connect-flash');
const expressSession =  require('express-session');
const compression = require('compression');
const helmet  = require("helmet")

// import a user class that can be used in socket .io implementation
const {Users} = require('./utils/userClass');
mongoose.Promise = global.Promise;
/*
Allow server to use Socket.io
1. Switch to http server, but pass in express app in the function handler (so we can still use app to route all our URLs)
2. Use socket io to connect to the web server
3. Change app.listen to http.listen
4. Use socket io to handle new connections to our server -> io.on('connection' ....){}
*/
//=====================================
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//=====================================

// Load envirorment constiables
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
  app.use(compression())
  app.use(helmet())
  require('./passport/passport-local')(passport);
  require('./passport/passport-facebook')(passport);
  //pass additional class into socket.io , so we can use this class in our chat room
  require('./socket/groupchat')(io,Users);
  require('./socket/friend')(io);


//view engine setup


app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.use('/public', express.static('public'));

//these following two line required to use flash message , need to put before  passport.initialize.
app.use(expressSession({secret:'Boyan|Ivy',saveUninitialized:false,resave:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//it have to put before router

// use express.Router
app.use('/', userRouter);
app.use('/', homeRouter);
app.use('/', groupRouter);
app.use('/api',apiRouter);
app.get('/', function (req, res) {
  res.render('index');

});
//get 404 page
app.use(function (req, res) {
  res.render('404');
});


http.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000!');
});
