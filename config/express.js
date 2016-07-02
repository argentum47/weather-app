module.exports = function(app) {
  'use strict';

  //const favicon = require('serve-favicon');
  const logger = require('morgan');
  const bodyParser = require('body-parser');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
}

//var cookieParser = require('cookie-parser');
//app.use(cookieParser());
