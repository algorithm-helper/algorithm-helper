import queryString from 'query-string';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const getContentUrlKey = params => {
  const { categoryKey, subcategoryKey, topicKey } = params;
  let urlRoot = '/categories';
  if (categoryKey) urlRoot += `/${categoryKey}`;
  if (subcategoryKey) urlRoot += `/${subcategoryKey}`;
  if (topicKey) urlRoot += `/${topicKey}`;
  return urlRoot;
};

export const getItemIndexFromQueryString = queryStr => {
  const queryObj = queryString.parse(queryStr);
  if (queryObj && queryObj.item && isNumeric(queryObj.item)) {
    return parseInt(queryObj.item);
  }
  return undefined;
};
