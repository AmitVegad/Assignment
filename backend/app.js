var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content-Type,Accept,Authorization'
      )
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,PUT')
  next()
})

app.use('/user', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect("mongodb://localhost:27017",{ useNewUrlParser: true})
const db = mongoose.connection;
db.on('open',()=>{
  console.log("Connected to the MongoDB database.");
})
db.on('error', (err) => {
  console.log(`Database error: ${err}`);
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
