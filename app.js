var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validate = require('express-validator');
var passport = require('passport');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var search = require('./routes/search');
var reserve = require('./routes/reserve');
var best = require('./routes/best');
var services = require('./routes/services');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validate());
app.use(express.static(path.join(`${__dirname}/react/build`)));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/search', search);
app.use('/reserve', reserve);
app.use('/best', best);
app.use('/services', services);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'react/build', 'index.html'));
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
