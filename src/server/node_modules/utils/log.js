const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: 'AlgorithmHelper',
  level: 'debug',
});
