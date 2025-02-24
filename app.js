// Required modules and dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var cors = require('cors');  // Import CORS Middleware

// Connect to MongoDB
require('./app_api/models/db');

// Import API Router
var apiRouter = require('./app_api/routes/index');

// Import Web Routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

// Initialize Express app
var app = express();

// Enable CORS for Angular Frontend (http://localhost:4200)
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests from Angular app
  methods: 'GET,POST,PUT,DELETE',   // Allow all necessary methods
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

// Explicitly allow all HTTP methods for API routes
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Set up view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register Handlebars Partials BEFORE defining routes
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware for logging, parsing requests, and serving static files
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes for the application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);  // Attach API router for backend requests

// Catch 404 errors and forward to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Provide error details only in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export the configured app for use elsewhere
module.exports = app;
