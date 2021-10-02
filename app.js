var createError = require('http-errors');
var express = require('express');
require('dotenv').config()
    
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
 

// databse require
var db = require("./config/databaseConnection")
// routers import 
var usersRouter = require('./routes/users');

var app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

db.dbConnect(process.env.MONGODB_URL)
// view engine setup
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', usersRouter);

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
  console.log(err.message)
  res.send(err.message)
});

module.exports = app;
