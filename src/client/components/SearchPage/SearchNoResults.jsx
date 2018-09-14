import React from 'react';
import PropTypes from 'prop-types';

import {
  searchNoResults,
  searchNoResultsTitle,
  searchNoResultsSubtitle,
} from './styles.scss';

/**
 * Renders the SearchNoResults stateless functional components.
 *
 * @param {object} props
 */
const SearchNoResults = props => (
  <div className={searchNoResults}>
    <div className={searchNoResultsTitle}>{props.title}</div>
    <div className={searchNoResultsSubtitle}>{props.subtitle}</div>
  </div>
);

SearchNoResults.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SearchNoResults;
