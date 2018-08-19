const mongoose = require('mongoose');
const { MONGO_URL } = require('./dbUtils');
const log = require('../../utils/log');

/**
 * Setups Mongoose connection to MongoDB with connected/disconnected event listeners. Disconnects
 * when the Node.js application is closed with SIGINT.
 */
const setupMongoose = () => {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => {
    log.info('Mongoose connected');
  });

  mongoose.connection.on('disconnected', () => {
    log.info('Mongoose disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose connection closed');
      process.exit(0);
    });
  });
};

module.exports = setupMongoose;