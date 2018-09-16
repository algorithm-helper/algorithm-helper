const ELASTICSEARCH_URL = process.env.AWS_ELASTICSEARCH_URL || 'http://localhost:9200';
const MAX_TIMEOUT = 5000;
const FIELDS_USED = ['title', 'description', 'articleContent'];
const LOG_LEVEL = 'trace';
const INDEX_NAME = 'algorithmhelper';
const TYPE_NAME = 'article';

module.exports = {
  ELASTICSEARCH_URL,
  MAX_TIMEOUT,
  FIELDS_USED,
  LOG_LEVEL,
  INDEX_NAME,
  TYPE_NAME,
};
