const { AccountHelpers } = include('mongo/helpers');

/**
 * Authenticates the current user from the X-Auth header of the request, and
 * attempting to find a user in MongoDB with the given token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const authenticateUser = (req, res, next) => {
  const token = req.header('X-Auth');

  AccountHelpers.findUserByToken(token)
    .then(user => {
      if (!user) {
        throw new Error('Could not authenticate user');
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(error => {
      res.status(401).send(JSON.stringify({ error: error.message }));
    });
};

module.exports = authenticateUser;
