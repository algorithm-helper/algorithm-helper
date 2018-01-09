require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const marked = require('marked');
const request = require('request');
const path = require('path');
const session = require('express-session');

// Utils:
const { constructArticleSrcDestUrls } = require('./utils/constructArticleSrcDestUrls');
const { getAllArticleContent } = require('./utils/getAllArticleContent');
const { getSearchResults } = require('./utils/getSearchResults');
const { getTopicIndexFromIndex } = require('./utils/getTopicIndexFromIndex');
const { renderCategoryPage } = require('./utils/renderCategoryPage');
const { renderTopicPage } = require('./utils/renderTopicPage');
const { renderArticlePage } = require('./utils/renderArticlePage');
const { replaceEmWithUnderscores } = require('./utils/replaceEmWithUnderscores');

// Firebase:
const { retrieveArticleSignedUrl } = require('./firebase/retrieveArticleSignedUrl');
const { retrieveArticleContents } = require('./firebase/retrieveArticleContents');
const { uploadAllArticles } = require('./firebase/uploadAllArticles');

// Data:
const categoryIndex = require('./../content/index.json');
const topicIndex = getTopicIndexFromIndex(categoryIndex);
const PREFIX_OFFSET = 8;
const TEMP_DIR_PATH = './temp';
const TEMP_FILE_PATH = 'temp/temp.md';
const articleContent = getAllArticleContent(categoryIndex);

if (!fs.existsSync(TEMP_DIR_PATH)){
  fs.mkdirSync(TEMP_DIR_PATH);
}

// Configure markdown renderer:
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

// Configure Firebase/Google Cloud Storage:
let gcsStorage;
if (process.env.GCS_JSON_TOKEN) {
  const gcsKeyFilePath = path.join(`${__dirname}/gcsKeyFile.json`);
  fs.writeFileSync(gcsKeyFilePath , process.env.GCS_JSON_TOKEN);
  const gcsKeyFile = JSON.parse(process.env.GCS_JSON_TOKEN);

  gcsStorage = require('@google-cloud/storage')({
    projectId: 'algorithm-helper-storage',
    keyFilename: gcsKeyFilePath
  });
} else {
  gcsStorage = require('@google-cloud/storage')({
    projectId: 'algorithm-helper-storage',
    keyFilename: 'server/firebase/config.json'
  });
}
uploadAllArticles(gcsStorage, constructArticleSrcDestUrls(categoryIndex));

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

// Start server:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Home page:
app.get('/', (req, res) => {
  return res.render('index.hbs', {
    topicIndex: JSON.stringify(topicIndex)
  });
});

// About page:
app.get('/about', (req, res) => {
  const aboutFilePath = 'content/information/about.md';

  fs.readFile(aboutFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }

    return res.render('information.hbs', {
      title: 'About',
      article: marked(data)
    });
  });
});

// Contact page:
app.get('/contact', (req, res) => {
  const contactFilePath = 'content/information/contact.md';
  
  fs.readFile(contactFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }

    return res.render('information.hbs', {
      title: 'Contact',
      article: marked(data)
    });
  });
});

// Terms and Conditions page:
app.get('/terms-and-conditions', (req, res) => {
  const termsFilePath = 'content/information/terms-and-conditions.md';
  
  fs.readFile(termsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }

    return res.render('information.hbs', {
      title: 'Terms and Conditions',
      article: marked(data)
    });
  });
});

// Categories page:
app.get('/categories', (req, res) => {
  res.render('categories.hbs', {
    categoryIndex: JSON.stringify(categoryIndex)
  });
});

// Category page:
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

// Topic page:
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

// Article page:
app.get('/categories/:category/:topic/:article', (req, res) => {
  let category = req.params.category;
  let topic = req.params.topic;
  let article = req.params.article;

  renderArticlePage({ category, topic, article })
  .then((articleFilePath) => {
    articleFilePath = articleFilePath.substring(PREFIX_OFFSET, articleFilePath.length);

    retrieveArticleSignedUrl(gcsStorage, articleFilePath)
    .then((signedUrl) => {
      request.get(signedUrl, function (err, resp, data) {
        if (err) {
          return res.redirect(`/categories/${category}/${topic}`);
        }
        // For debug purposes:
        // console.log(data);
        
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
            },
            gcsSignedUrl: signedUrl
          }),
          showTableOfContents: true
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect(`/categories/${category}/${topic}`);
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

// Search page:
app.get('/search', (req, res) => {
  if (!req.query.q) {
    return res.redirect('/');
  }

  let query = req.query.q;
  getSearchResults(req.query.q, articleContent)
  .then((results) => {
    return res.render('search.hbs', {
      results: JSON.stringify(results)
    });
  })
  .catch((err) => {
    return res.redirect('/');
  });
});

// Handle invalid routes by redirecting to home page:
app.get('*', (req, res) => {
  return res.redirect('/');
});

module.exports = {
  app
};
