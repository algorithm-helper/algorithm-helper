const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

// MongoDB Utils:
const CategoryDBUtils = require('./mongo/utils/categoryDBUtils');
const SubcategoryDBUtils = require('./mongo/utils/subcategoryDBUtils');
const TopicDBUtils = require('./mongo/utils/topicDBUtils');
const ColorDBUtils = require('./mongo/utils/colorDBUtils');
const setupMongoose = require('./mongo/utils/setupMongoose');

// Startup Scripts:
const initMongo = require('../scripts/initMongo');

// Utils:
const log = require('./utils/log');
const cors = require('./utils/cors');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 5000;

app.use(cors);
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

setupMongoose();

if (process.env.PRODUCTION) {
  initMongo({ silent: true });
}

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

/**
 * GET /data/categories
 * Gets all of the category data from MongoDB.
 */
app.get('/data/categories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryDBUtils.getCategoryData()
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
app.get('/data/subcategories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  SubcategoryDBUtils.getSubcategoryData()
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
app.get('/data/categories/:categoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey } = req.params;
  CategoryDBUtils.getCategoryDataByKey(categoryKey)
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
app.get('/data/categories/:categoryKey/:subcategoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey } = req.params;
  SubcategoryDBUtils.getSubcategoryDataByKey(categoryKey, subcategoryKey)
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
app.get('/data/categories/:categoryKey/:subcategoryKey/:topicKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey, topicKey } = req.params;
  TopicDBUtils.getTopicDataByKey(categoryKey, subcategoryKey, topicKey)
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
app.get('/data/colors', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  ColorDBUtils.getColorData()
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
app.get('/data/extended/categories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryDBUtils.getCategoryDataExtended()
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
app.get('/data/extended/categories/:categoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey } = req.params;
  CategoryDBUtils.getCategoryDataByKeyExtended(categoryKey)
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
app.get('/data/extended/categories/:categoryKey/:subcategoryKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { categoryKey, subcategoryKey } = req.params;
  SubcategoryDBUtils.getSubcategoryDataByKeyExtended(categoryKey, subcategoryKey)
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
app.get('/data/utils/categories-color-key-mapping', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  CategoryDBUtils.getCategoryColorKeyMapping()
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

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
