/**
 * Provides the routes related to search.
 */
const express = require('express');

const { SearchHelpers } = include('elasticsearch/helpers');

const router = express.Router();

/**
 * POST /search/search
 * Makes a search request to Elasticsearch and responds with the results.
 *
 * @param {string} query
 */
router.post('/search', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  SearchHelpers.getSearchResults(req.body.query)
    .then(data => {
      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

module.exports = router;
