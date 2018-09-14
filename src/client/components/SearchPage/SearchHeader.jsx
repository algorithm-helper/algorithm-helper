import React from 'react';
import PropTypes from 'prop-types';

import { searchHeader, searchHeaderTitle } from './styles.scss';

/**
 * Renders the SearchHeader stateless functional component.
 *
 * @param {object} props
 */
const SearchHeader = props => (
  <div className={searchHeader}>
    <div className={searchHeaderTitle}>
      {props.title}
    </div>
  </div>
);

SearchHeader.propTypes = {
  title: PropTypes.string,
};

export default SearchHeader;
