const _ = require('lodash');

const { User } = include('mongo/models');

const AccountHelpers = {
  /**
   * Creates a new User with the given parameters.
   *
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   */
  signupNewUser: (fullName, email, password) => {
    const user = new User({ fullName, email, password });
    return user.save()
      .then(() => user.generateAuthToken())
      .then(token => ({ user, token }));
  },

  /**
   * Returns a Promise to find a user in MongoDB with the given token.
   *
   * @param {string} token
   */
  findUserByToken: token => User.findByToken(token),

  /**
   * Returns a Promise that finds the User with the given email and password
   * credentials, otherwise rejects with an error.
   *
   * @param {string} email
   * @param {string} password
   */
  findUserByCredentials: (email, password) => {
    let currentUser;
    return User.findByCredentials(email, password)
      .then(user => {
        currentUser = user;
        return user.generateAuthToken();
      })
      .then(token => ({ user: currentUser, token }));
  },

  /**
   * Logs out user by removing the given auth token from their user record in MongoDB.
   *
   * @param {User} user
   * @param {String} token
   */
  logoutUser: (user, token) => user.removeToken(token),

  /**
   * Gets the user data (everything excluding token data) from the given user record.
   *
   * @param {string} id
   */
  getUserData: id => (
    User.findById(id)
      .lean()
      .exec()
      .then(result => _.pick(result, [
        'fullName',
        'email',
        'bookmarks',
        'completedItems',
      ]))
  ),
};

module.exports = AccountHelpers;
