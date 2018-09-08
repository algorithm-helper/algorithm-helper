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
};

module.exports = AccountHelpers;
