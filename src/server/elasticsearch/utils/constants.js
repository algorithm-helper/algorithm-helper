const ELASTICSEARCH_URL = process.env.AWS_ELASTICSEARCH_URL || 'http://localhost:9200';
const MAX_TIMEOUT = 5000;
const FIELDS_USED = ['key', 'title', 'description'];

module.exports = {
  ELASTICSEARCH_URL,
  MAX_TIMEOUT,
  FIELDS_USED,
};
