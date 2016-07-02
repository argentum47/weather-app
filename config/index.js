function bootStrap(app) {
  require('./express')(app);
  require('./routes')(app);
}

module.exports = bootStrap
