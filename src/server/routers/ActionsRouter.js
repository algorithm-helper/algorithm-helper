/* eslint-disable  no-underscore-dangle */

/**
 * Provides the routes related to actions.
 */
const express = require('express');

const { ActionsHelpers } = include('mongo/helpers');
const { authenticateUser } = include('middleware/authentication');

const router = express.Router();

/**
 * POST /actions/get-completion-items
 * Returns with the completedItems and bookmarks for this current logged in user.
 */
router.post('/get-completion-items', authenticateUser, (req, res) => {
  ActionsHelpers.getCompletionItems(req.user._id)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error }));
    });
});

/**
 * POST /actions/mark-as-completed
 * Toggles the completion for this current item for the currently logged in user. If no user
 * is logged in, then returns an error response.
 *
 * @param {string} key
 */
router.post('/mark-as-completed', authenticateUser, (req, res) => {
  ActionsHelpers.handleItemCompleted(req.user._id, req.body.key)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error }));
    });
});

/**
 * POST /actions/save-to-bookmarks
 * Adds or removes the bookmark for this current item for the currently logged in user. If no user
 * is logged in, then returns an error response.
 *
 * @param {string} url
 */
router.post('/save-to-bookmarks', authenticateUser, (req, res) => {
  ActionsHelpers.handleItemBookmarked(req.user._id, req.body.key)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error }));
    });
});

module.exports = router;
