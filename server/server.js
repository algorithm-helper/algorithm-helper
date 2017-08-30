require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fuzzy = require('fuzzy');
const fs = require('fs');
const hbs = require('hbs');
const marked = require('marked');
const path = require('path');
const session = require('express-session');

// Data:
const categoryIndex = require('./../content/categoryIndex.json');
const topicIndex = require('./../content/topicIndex.json');

// Utils:
const { renderCategoryPage } = require('./utils/renderCategoryPage');
const { renderTopicPage } = require('./utils/renderTopicPage');
const { renderArticlePage } = require('./utils/renderArticlePage');

// Configure markdown renderer:
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

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
  return res.render('index.hbs', {
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

  renderCategoryPage({ category })
  .then((categoryData) => {
    return res.render('category.hbs', {
      categoryData: JSON.stringify(categoryData)
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.category) {
      return res.redirect('/categories');
    }
  });
});

app.get('/categories/:category/:topic', (req, res) => {
  let category = req.params.category;
  let topic = req.params.topic;

  renderTopicPage({ category, topic })
  .then((topicData) => {
    return res.render('topic.hbs', {
      topicData: JSON.stringify(topicData)
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.category) {
      return res.redirect('/categories');
    } else if (err.topic) {
      return res.redirect(`/categories/${category}`);
    }
  });
});

app.get('/categories/:category/:topic/:article', (req, res) => {
  let category = req.params.category;
  let topic = req.params.topic;
  let article = req.params.article;

  renderArticlePage({ category, topic, article })
  .then((articleFilePath) => {
    fs.readFile(articleFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.redirect(`/categories/${category}/${topic}`);
      }
      // For debug purposes:
      // console.log(marked(data));

      // Get full title and path of category, topic, article:
      let categoryData = categoryIndex.find((x) => {
        return x.category == category;
      });

      let topicData = categoryData.topics.find((x) => {
        return x.topic == topic;
      });

      let articleData = topicData.articles.find((x) => {
        return x.article == article;
      });

      return res.render('article.hbs', {
        article: marked(data),
        articlePath: JSON.stringify({
          category: {
            title: categoryData.title,
            url: categoryData.url
          },
          topic: {
            title: topicData.title,
            url: `${categoryData.url}${topicData.url}`
          },
          article: {
            title: articleData.title,
            url: `${categoryData.url}${topicData.url}${articleData.url}`
          }
        })
      });
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.category) {
      return res.redirect('/categories');
    } else if (err.topic) {
      return res.redirect(`/categories/${category}`);
    } else if (err.article) {
      return res.redirect(`/categories/${category}/${topic}`);
    }
  });
});

app.get('*', (req, res) => {
  return res.redirect('/');
});

module.exports = {
  app
};
