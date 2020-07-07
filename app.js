import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session'
import flash from 'connect-flash';
import methodOverride from 'method-override';
const __dirname = path.resolve();
const app = express();
//import router
import authRouter from './app/authentication/authenticationRouter.js';
import indexRouter from './routes/indexRouter.js';
import friendRouter from './app/friend/friendRouter.js';
import userRouter from './app/user/userRouter.js';
import messageRouter from './app/mesage/messageRouter.js'
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
app.use('/sms', messageRouter);
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

export default app;
