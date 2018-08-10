const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

// Utils:
const log = require('./utils/log');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: '<Algorithm Helper Secret>',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.listen(port, () => {
  log.info(`Server started on port ${port}`);
});

/**
 * POST /accounts/login
 * Logs user in with the given credentials.
 *
 * @param {string} email
 * @param {string} password
 */
app.post('/accounts/login', (req, res) => {
  const userData = _.pick(req.body, ['email', 'password']);


  const { email, password } = req.body;
  log.debug(email);
  log.debug(password);
});

/**
 * POST /accounts/sign-up
 * Registers user with the given information.
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 */
app.post('/accounts/sign-up', (req, res) => {
  const { fullName, email, password } = req.body;
  log.debug(fullName);
  log.debug(email);
  log.debug(password);
});

/**
 * Data Routes
 */

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
