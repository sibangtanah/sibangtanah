var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var moment = require('moment');
var compression = require('compression');
var helmet = require('helmet');
var RequestLog = require('./models/analytics.model');
var mongoDB = process.env.MONGODB_URI || 'mongodb://bpkadjepara:51BANGTAN46@ds213832.mlab.com:13832/sbgtnh';

// Router declaration
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var petaRouter = require('./routes/peta.route');
var katalogRouter = require('./routes/katalog.route');
var notifikasiRouter = require('./routes/notifikasi.route');

// Express init
var app = express();

// Mongoose connect to mLab
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

// Mongoose as a promise library
mongoose.Promise = global.Promise;

// Mongoose as a default connection
var db = mongoose.connection;

// Mongoose handling error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Request log time
app.use((req, res, next) => {
  var requestTime = Date.now();
  res.on('finish', () => {
    if (req.path === '/analytics') {
      return;
    }
    RequestLog.create({
      url: req.path,
      method: req.method,
      responseTime: (Date.now() - requestTime) / 1000,
      day: moment(requestTime).format('dddd'),
      hour: moment(requestTime).hour()
    });
  });
  next();
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Compression
app.use(compression());

// Using variable
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Using routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peta', petaRouter);
app.use('/katalog', katalogRouter);
app.use('/notifikasi', notifikasiRouter);

app.get('/analytics', (req, res, next) => {
  require('./analytics_service').getAnalytics()
  .then(analytics => res.render('analytics', { analytics }));
});

// Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect flash
app.use(flash());

// Global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
