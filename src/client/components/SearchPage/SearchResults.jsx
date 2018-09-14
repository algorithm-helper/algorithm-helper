import React from 'react';
import PropTypes from 'prop-types';

import { searchResults } from './styles.scss';

/**
 * Renders the SearchResults stateless functional component.
 *
 * @param {object} props
 */
const SearchResults = props => (
  <div className={searchResults}>
    {`${props.numResults} ${props.numResults === 1 ? 'result' : 'results'} found.`}
  </div>
);

SearchResults.propTypes = {
  numResults: PropTypes.number,
};

export default SearchResults;
