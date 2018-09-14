/**
 * Gets the path to the topic given its key.
 *
 * @param {string} topicKey
 */
const getTopicUrlFromKey = topicKey => `/categories/${topicKey}`;

export default getTopicUrlFromKey;
