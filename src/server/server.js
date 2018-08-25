import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';

import {
  AccountHelpers,
  CategoryHelpers,
  ColorHelpers,
  SubcategoryHelpers,
  TopicHelpers,
} from 'mongo/helpers';
import { setupMongoose } from 'mongo/mongoose';
import { authenticateUser } from 'middleware/authentication';
import { cors } from 'middleware/web';
import { log } from 'utils';

const publicPath = path.join(__dirname, '..', '..', 'dist');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(session({
  secret: '<Algorithm Helper Secret>',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
}));

setupMongoose();

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
app.post('/accounts/sign-up', (req, res) => {
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
app.post('/accounts/user', authenticateUser, (req, res) => {
  res.send(req.user);
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
app.get('/actions/get-item-bookmarked', (req, res) => {
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
app.post('/actions/mark-as-completed', (req, res) => {
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
app.post('/actions/save-to-bookmarks', (req, res) => {
  // TODO
  log.info(req, res);
});

/**
 * GET /data/categories
 * Gets all of the category data from MongoDB.
 */
app.get('/data/categories', (req, res) => {
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
app.get('/data/subcategories', (req, res) => {
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
app.get('/data/categories/:categoryKey', (req, res) => {
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
app.get('/data/categories/:categoryKey/:subcategoryKey', (req, res) => {
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
app.get('/data/categories/:categoryKey/:subcategoryKey/:topicKey', (req, res) => {
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
app.get('/data/colors', (req, res) => {
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
app.get('/data/extended/categories', (req, res) => {
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
app.get('/data/extended/categories/:categoryKey', (req, res) => {
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
app.get('/data/extended/categories/:categoryKey/:subcategoryKey', (req, res) => {
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
app.get('/data/utils/categories-color-key-mapping', (req, res) => {
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
 * GET *
 * For all other routes, defaults to the index page of the Algorithm Helper
 * website.
 */
app.get('*', (req, res) => {
  console.log(publicPath);
  console.log(__dirname);
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
