import { S3_URL_PREFIX } from '../settings/s3Settings';

/**
 * Returns the S3 article url corresponding to the params.
 *
 * @param {object} params
 */
const getS3ArticleUrl = params => {
  const { categoryKey, subcategoryKey, topicKey } = params;
  return `${S3_URL_PREFIX}/${categoryKey}/${subcategoryKey}/${topicKey}.md`;
};

export default getS3ArticleUrl;
