/**
 * Provides the routes related to data (public API).
 */
const express = require('express');

const {
  AggregationHelpers,
  CategoryHelpers,
  SubcategoryHelpers,
  TopicHelpers,
} = include('mongo/helpers');

const router = express.Router();

/**
 * GET /data/categories
 * Gets all of the category data from MongoDB.
 */
router.get('/categories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryHelpers.getCategoryData()
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/subcategories
 * Gets all of the subcategory data from MongoDB.
 */
router.get('/subcategories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  SubcategoryHelpers.getSubcategoryData()
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/categories/:categoryKey
 * Gets the category data for a specific category by key from MongoDB.
 *
 * @param {string} categoryKey
 */
router.get('/categories/:categoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey } = req.params;
  CategoryHelpers.getCategoryDataByKey(categoryKey)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/categories/:categoryKey/:subcategoryKey
 * Gets the subcategory data for a specific subcategory by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 */
router.get('/categories/:categoryKey/:subcategoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey } = req.params;
  SubcategoryHelpers.getSubcategoryDataByKey(categoryKey, subcategoryKey)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/categories/:categoryKey/:subcategoryKey/:topicKey
 * Gets the topic data for a specific topic by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 * @param {string} topicKey
 */
router.get('/categories/:categoryKey/:subcategoryKey/:topicKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey, topicKey } = req.params;
  TopicHelpers.getTopicDataByKey(categoryKey, subcategoryKey, topicKey)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/colors
 * Gets all the color data from MongoDB.
 */
router.get('/colors', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  ColorHelpers.getColorData()
    .then(data => {
      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/extended/categories
 * Gets all of the category data with the data of its children, from MongoDB.
 */
router.get('/extended/categories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryHelpers.getCategoryDataExtended()
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/extended/categories/:categoryKey
 * Gets the category data for a particular category with the data of its children, from MongoDB.
 *
 * @param {string} categoryKey
 */
router.get('/extended/categories/:categoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey } = req.params;
  CategoryHelpers.getCategoryDataByKeyExtended(categoryKey)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/extended/categories/:categoryKey/:subcategoryKey
 * Gets the subcategory data for a particular subcategory with the data of its children, from
 * MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 */
router.get('/extended/categories/:categoryKey/:subcategoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey } = req.params;
  SubcategoryHelpers.getSubcategoryDataByKeyExtended(categoryKey, subcategoryKey)
    .then(data => {
      if (data === null) {
        res.status(400).send(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

      res.status(200).send(JSON.stringify({ data }));
    })
    .catch(error => {
      res.status(400).send(JSON.stringify({ error: error.message }));
    });
});

/**
 * GET /data/utils/categories-color-key-mapping
 * Gets the mapping of categoryKey to colorKey, from MongoDB.
 */
router.get('/utils/categories-color-key-mapping', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryHelpers.getCategoryColorKeyMapping()
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
 * GET /data/utils/topic-item-count
 * Gets the total number of TopicItems stored in MongoDB.
 */
router.get('/utils/topic-item-count', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  AggregationHelpers.getTopicItemsCount()
    .then(data => {
      if (!data) {
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
