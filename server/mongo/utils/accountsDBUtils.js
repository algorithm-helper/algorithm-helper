const User = require('../models/User');

/**
 * Creates a new User with the given parameters.
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 */
const signupNewUser = (fullName, email, password) => {
  const user = new User({ fullName, email, password });
  return user.save()
  .then(() => user.generateAuthToken())
  .then(token => ({ user, token }));
};

/**
 * Returns a Promise to find a user in MongoDB with the given token.
 *
 * @param {string} token
 */
const findUserByToken = token => (
  User.findByToken(token)
);

/**
 * Returns a Promise that finds the User with the given email and password
 * credentials, otherwise rejects with an error.
 *
 * @param {string} email
 * @param {string} password
 */
const findUserByCredentials = (email, password) => (
  User.findByCredentials(email, password)
);

module.exports = {
  signupNewUser,
  findUserByToken,
  findUserByCredentials,
};
