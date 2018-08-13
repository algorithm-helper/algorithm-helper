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
 * GET /actions/get-item-completed
 * Returns true/false based on whether the currently logged in user has the item as completed. If
 * no user is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
app.get('/actions/get-item-completed', (req, res) => {
  // TODO
});

/**
 * GET /actions/get-item-bookmarked
 * Returns true/false based on whether the currently logged in user has the item as bookmarked. If
 * no user is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
app.get('/actions/get-item-bookmarked', (req, res) => {
  // TODO
});

/**
 * POST /actions/mark-as-completed
 * Toggles the completion for this current item for the currently logged in user. If no user
 * is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 *
 */
app.post('/actions/mark-as-completed', (req, res) => {
  // TODO
});

/**
 * POST /actions/save-to-bookmarks
 * Adds or removes the bookmark for this current item for the currently logged in user. If no user
 * is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
app.post('/actions/save-to-bookmarks', (req, res) => {
  // TODO
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
