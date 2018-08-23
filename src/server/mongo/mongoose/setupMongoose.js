import mongoose from 'mongoose';
import { MONGO_URL } from 'mongo/utils/constants';
import { log } from 'utils';

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

  process.on('exit', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose connection closed');
      process.exit(0);
    });
  });
};

export default setupMongoose;
