module.exports = function(app) {
  'use strict';

  app.use('/', require('../routes/index'));
  app.use('/weather', require('../routes/weather'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  return app;
}
