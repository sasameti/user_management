var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./config/db');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var validator = require('express-validator');
var passport = require('passport');
var expressSession = require('express-session');

// Connect to DB
mongoose.connect(dbConfig.url);


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(validator());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport


app.use(expressSession({secret: 'mySecretKey'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates



// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

//initialize permission





var routes = require('./routes/new-routes')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;