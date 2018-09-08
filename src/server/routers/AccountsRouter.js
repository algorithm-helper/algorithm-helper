/**
 * Provides the routes related to accounts.
 */
const express = require('express');

const { AccountHelpers } = include('mongo/helpers');
const { authenticateUser } = include('middleware/authentication');

const router = express.Router();

/**
 * POST /accounts/login
 * Logs user in with the given credentials.
 *
 * @param {string} email
 * @param {string} password
 */
router.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { email, password } = req.body;
  AccountHelpers.findUserByCredentials(email, password)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      const { user, token } = data;
      res.header('X-Auth', token).status(200).send(JSON.stringify({ data: user }));
    })
    .catch(() => {
      res.status(400).send(JSON.stringify({ error: 'Invalid login credentials' }));
    });
});

/**
 * POST /accounts/sign-up
 * Registers user with the given information.
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 */
router.post('/sign-up', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { fullName, email, password } = req.body;

  AccountHelpers.signupNewUser(fullName, email, password)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      const { user, token } = data;
      res.header('X-Auth', token).status(200).send(JSON.stringify({ data: user }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error }));
    });
});

/**
 * POST /accounts/user
 * Returns the current user object if the request headers contains a valid token, otherwise
 * returns an error response.
 */
router.post('/user', authenticateUser, (req, res) => {
  res.send(req.user);
});

module.exports = router;
