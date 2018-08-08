const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: 'Algorithmica',
  level: 'debug',
});
