require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const fuzzy = require('fuzzy');
const path = require('path');
const hbs = require('hbs');

// Data:
const categoryIndex = require('./../content/categoryIndex.json');
const topicIndex = require('./../content/topicIndex.json');

// Utils:
const { renderCategoryPage } = require('./utils/renderCategoryPage');
const { renderTopicPage } = require('./utils/renderTopicPage');

var app = express();

const port = process.env.PORT || 3000;
const partialsPath = path.join(__dirname, '../views/partials');
const staticPath = path.join(__dirname, '../public');

app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
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
  console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    topicIndex: JSON.stringify(topicIndex)
  });
});

app.get('/categories', (req, res) => {
  res.render('categories.hbs', {
    categoryIndex: JSON.stringify(categoryIndex)
  });
});

app.get('/categories/:category', (req, res) => {
  let category = req.params.category;

  renderCategoryPage(category, (err, categoryData) => {
    if (err) {
      return res.redirect('/categories');
    }
    return res.render('category.hbs', {
      categoryData: JSON.stringify(categoryData)
    });
  });
});

app.get('/categories/:category/:topic', (req, res) => {
  let category = req.params.category;
  let topic = req.params.topic;

  renderTopicPage(category, topic, (errCategory, errTopic, topicData) => {
    if (errCategory) {
      return res.redirect('/categories');
    } else if (errTopic) {
      return res.redirect(`/categories/${category}`);
    }

    return res.render('topic.hbs', {
      topicData: JSON.stringify(topicData)
    });
  });
});

app.get('/categories/:category/:topic/:article', (req, res) => {
  console.log(req.params);

  return res.render('article.hbs');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = {
  app
};
