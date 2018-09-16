const { INDEX_NAME, TYPE_NAME } = require('./constants');

/**
 * Helper function that returns a Promise to a search with the Elasticsearch client with the
 * given query for the given field.
 *
 * @param {Client} client
 * @param {string} query
 * @param {string} field
 */
const getClientSearchQuery = (client, query, field) => {
  const matchKey = query ? 'match' : 'match_all';
  const matchVal = query ? { [field]: query } : {};
  return client.search({
    index: INDEX_NAME,
    type: TYPE_NAME,
    body: {
      query: {
        [matchKey]: matchVal,
      },
    },
  });
};

module.exports = getClientSearchQuery;
