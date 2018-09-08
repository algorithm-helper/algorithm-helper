import React from 'react';
import PropTypes from 'prop-types';

import {
  mainAreaNoResultsContainer,
  mainAreaNoResultsTitle,
  mainAreaNoResultsSubtitle,
} from './styles.scss';

/**
 * Renders the MainAreaNoResults stateless functional component.
 *
 * @param {object} props
 */
const MainAreaNoResults = props => (
  <div className={mainAreaNoResultsContainer}>
    <div className={mainAreaNoResultsTitle}>{props.title}</div>
    <div className={mainAreaNoResultsSubtitle}>{props.subtitle}</div>
  </div>
);

MainAreaNoResults.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default MainAreaNoResults;
