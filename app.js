const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();
//import router
const authRouter = require('./routes/authenticationRouter');
const indexRouter = require('./routes/indexRouter');
const friendRouter = require('./routes/friendRouter');
const userRouter = require('./routes/userRouter');
// overide method
// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method')); //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override')); //      IBM
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//session
app.use(cookieParser('ahihi'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//static file
app.use(express.static(path.join(__dirname, 'public')))

//router
app.use('/auth', authRouter);
app.use('/friend', friendRouter);
app.use('/user', userRouter);
app.use('', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
