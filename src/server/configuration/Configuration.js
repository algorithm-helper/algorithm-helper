const _ = require('lodash');

const config = require('./config');

// Note that this is used as a central configuration getter instead of having a separate
// config/constants file for the various servies used like AWS, MongoDB, Elasticsearch, etc.
const Configuration = {
  /**
   * Gets the configuration value for the given key.
   *
   * @param {string} key
   */
  get(key) {
    if (!key) {
      throw new Error('Cannot get configuration value with invalid key');
    }

    return _.get(config, key);
  },
};

module.exports = Configuration;
