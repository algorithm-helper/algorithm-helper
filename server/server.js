require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const fuzzy = require('fuzzy');
const path = require('path');
const hbs = require('hbs');

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
  res.render('index.hbs');
});

app.get('/categories', (req, res) => {
  res.render('categories.hbs');
});

module.exports = {
  app: app
};
