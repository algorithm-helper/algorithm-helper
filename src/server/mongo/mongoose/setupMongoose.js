const mongoose = require('mongoose');

const { MONGO_URL } = include('mongo/utils/constants');
const { log } = include('utils');

/**
 * Setups Mongoose connection to MongoDB with connected/disconnected event listeners. Disconnects
 * when the Node.js application is closed with SIGINT.
 */
const setupMongoose = () => {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => {
    log.info('Mongoose connected');
    log.info('Mongo URL', MONGO_URL);
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

  process.on('exit', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose connection closed');
      process.exit(0);
    });
  });
};

module.exports = setupMongoose;