/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const connectionClass = require('http-aws-es');
const elasticsearch = require('elasticsearch');

const {
  ELASTICSEARCH_URL,
  MAX_TIMEOUT,
  LOG_LEVEL,
  FIELDS_USED,
} = include('elasticsearch/utils/constants');
const {
  getClientSearchQuery,
  scoreComparator,
} = include('elasticsearch/utils');

const SearchHelpers = {
  /**
   * Makes a request to AWS Elasticsearch with the search query. This compiles the final search
   * results by searching with respect to the necessary text fields in parallel, then aggregating
   * them by total combined score, and grabbing only necessary fields.
   *
   * @param {string} query
   */
  getSearchResults: async query => {
    let client;
    if (process.env.PRODUCTION) {
      AWS.config.update({
        credentials: new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_KEY),
        region: 'us-east-1',
      });

      client = new elasticsearch.Client({
        hosts: ELASTICSEARCH_URL,
        log: LOG_LEVEL,
        connectionClass,
        amazonES: {
          credentials: new AWS.EnvironmentCredentials('AWS'),
        },
      });
    } else {
      client = new elasticsearch.Client({
        hosts: ELASTICSEARCH_URL,
        log: LOG_LEVEL,
      });
    }

    // Test connection to Elasticsearch instance:
    await client.ping({ requestTimeout: MAX_TIMEOUT });

    // Make a request to the Search API for each field in parallel:
    const results = await Promise.all(FIELDS_USED.map(field => (
      getClientSearchQuery(client, query, field)
    )));

    // Map each search result key to their combined score and other data:
    const aggregatedMapping = {};
    results.forEach(result => {
      result.hits.hits.forEach(searchResult => {
        const { key, title, description } = searchResult._source;
        const score = searchResult._score;

        if (!aggregatedMapping[key]) {
          aggregatedMapping[key] = {
            score: 0,
            title,
            description,
          };
        }
        aggregatedMapping[key].score += score;
      });
    });

    // Convert the mapping object into an array and sort by combined score:
    return Object
      .keys(aggregatedMapping)
      .map(key => ({ key, ...aggregatedMapping[key] }))
      .sort(scoreComparator);
  },
};

module.exports = SearchHelpers;
