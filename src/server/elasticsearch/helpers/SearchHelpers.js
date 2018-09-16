/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const connectionClass = require('http-aws-es');
const elasticsearch = require('elasticsearch');

const Configuration = include('configuration');
const { Category, Subcategory } = include('mongo/models');
const { getClientSearchQuery, scoreComparator } = include('elasticsearch/utils');

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
        credentials: new AWS.Credentials(
          Configuration.get('aws.accessKeyId'),
          Configuration.get('aws.secretKey'),
        ),
        region: Configuration.get('aws.region'),
      });

      client = new elasticsearch.Client({
        hosts: Configuration.get('elasticsearch.url'),
        log: Configuration.get('elasticsearch.logLevel'),
        connectionClass,
        amazonES: {
          credentials: new AWS.EnvironmentCredentials('AWS'),
        },
      });
    } else {
      client = new elasticsearch.Client({
        hosts: Configuration.get('elasticsearch.url'),
        log: Configuration.get('elasticsearch.logLevel'),
      });
    }

    // Test connection to Elasticsearch instance:
    await client.ping({ requestTimeout: Configuration.get('elasticsearch.maxTimeout') });

    // Make a request to the Search API for each field in parallel:
    const fieldsUsed = Configuration.get('elasticsearch.fieldsUsed');
    const results = await Promise.all(fieldsUsed.map(field => (
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
            topicTitle: title,
            description,
          };
        }
        aggregatedMapping[key].score += score;
      });
    });

    // Convert the mapping object into an array and sort by combined score:
    const arr = Object
      .keys(aggregatedMapping)
      .map(key => ({ key, ...aggregatedMapping[key] }))
      .sort(scoreComparator);

    // Need to get titles for the category and subcategory that the topic item belongs to:
    const titles = await Promise.all(arr.map(item => {
      const [categoryKey, subcategoryKey] = item.key.split('/');
      return Promise.all([
        Category.findOne({
          slug: categoryKey,
        }, {
          title: true,
        }).lean().exec(),
        Subcategory.findOne({
          slug: subcategoryKey,
        }, {
          title: true,
        }).lean().exec(),
      ])
        .then(result => ({
          categoryTitle: result[0].title,
          subcategoryTitle: result[1].title,
        }));
    }));

    arr.forEach((item, i) => {
      arr[i].categoryTitle = titles[i].categoryTitle;
      arr[i].subcategoryTitle = titles[i].subcategoryTitle;
    });

    return arr;
  },
};

module.exports = SearchHelpers;
