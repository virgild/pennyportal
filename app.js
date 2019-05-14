const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars');

const indexRouter = require('./routes/index');
const wipiRouter = require('./routes/wipi-routes');

const app = express();

// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(wipiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultView: 'default',
    layoutsDir: `${__dirname}/views/layouts/`,
    partialsDir: `${__dirname}/views/partials/`,
  }),
);

module.exports = app;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
