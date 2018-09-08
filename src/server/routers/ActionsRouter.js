/**
 * Provides the routes related to actions.
 */
const express = require('express');

const { log } = include('utils');

const router = express.Router();

/**
 * GET /actions/get-item-completed
 * Returns true/false based on whether the currently logged in user has the item as completed. If
 * no user is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
router.get('/get-item-completed', (req, res) => {
  // TODO
  log.info(req, res);
});

/**
 * GET /actions/get-item-bookmarked
 * Returns true/false based on whether the currently logged in user has the item as bookmarked. If
 * no user is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
router.get('/get-item-bookmarked', (req, res) => {
  // TODO
  log.info(req, res);
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
router.post('/mark-as-completed', (req, res) => {
  // TODO
  log.info(req, res);
});

/**
 * POST /actions/save-to-bookmarks
 * Adds or removes the bookmark for this current item for the currently logged in user. If no user
 * is logged in, then returns an error response.
 *
 * @param {string} topicItemKey
 * @param {string} authKey
 */
router.post('/save-to-bookmarks', (req, res) => {
  // TODO
  log.info(req, res);
});

module.exports = router;
