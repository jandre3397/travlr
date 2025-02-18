var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');  // ✅ Import Handlebars (hbs)

var indexRouter = require('./app_server/routes/index');  
var usersRouter = require('./app_server/routes/users');  
var travelRouter = require('./app_server/routes/travel'); 

var app = express();

// ✅ Set up view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// ✅ Register Handlebars Partials BEFORE Defining Routes
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Set Up Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// ✅ Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// ✅ Error Handler (Only Declared Once Now)
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
