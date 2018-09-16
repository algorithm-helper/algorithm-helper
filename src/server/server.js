const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');

const {
  AccountsRouter,
  ActionsRouter,
  DataRouter,
  SearchRouter,
} = include('routers');
const { setupMongoose } = include('mongo/mongoose');
const { cors } = include('middleware/web');
const { log } = include('utils');
const { initMongo } = include('mongo/utils');

const publicPath = path.resolve(process.cwd(), 'dist');
const port = process.env.PORT || 8080;

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

app.listen(port, () => {
  log.info(`Server started on port ${port}`);
  setupMongoose();

  if (process.env.DB_INIT) {
    initMongo({ silent: process.env.DB_INIT_SILENT === 'true' });
  }
});

/**
 * Routes related to user accounts such as login, sign up and user info are routed to the
 * AccountsRouter.
 */
app.use('/accounts', AccountsRouter);

/**
 * Routes related to actions on user data such as marking articles as completed, adding bookmarks,
 * and updating calendar heatmap are routed to the ActionsRouter.
 */
app.use('/actions', ActionsRouter);

/**
 * Routes related to data (public API) for the categories, subcategories, or topic data are
 * routed to the DataRouter.
 */
app.use('/data', DataRouter);

/**
 * Routes related to search (using Elasticsearch) are routed to the SearchRouter.
 */
app.use('/search', SearchRouter);

/**
 * GET *
 * For all other routes, defaults to the index page of the Algorithm Helper
 * website.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

module.exports = app;
