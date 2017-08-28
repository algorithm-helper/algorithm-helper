require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const fuzzy = require('fuzzy');
const path = require('path');
const hbs = require('hbs');

const categoryIndex = require('./../content/categoryIndex.json');
const topicIndex = require('./../content/topicIndex.json');

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

app.get('/topic', (req, res) => {
  res.render('topic.hbs');
});

app.get('/article', (req, res) => {
  res.render('article.hbs');
});

app.get('/categories/:category', (req, res) => {
  console.log(req.params);
});

app.get('/categories/:category/:topic', (req, res) => {
  console.log(req.params);
});

app.get('/categories/:category/:topic/:article', (req, res) => {
  console.log(req.params);
});

module.exports = {
  app: app
};
