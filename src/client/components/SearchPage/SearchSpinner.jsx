import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import { searchSpinnerContainer } from './styles.scss';

/**
 * Renders the SearchSpinner stateless functional component.
 *
 * @param {object} props
 */
const SearchSpinner = props => (
  <div className={searchSpinnerContainer}>
    <MDSpinner
      size={50}
      singleColor={props.color}
    />
  </div>
);

SearchSpinner.propTypes = {
  color: PropTypes.string,
};

export default SearchSpinner;
