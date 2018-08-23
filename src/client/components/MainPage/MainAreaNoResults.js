import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the MainAreaNoResults stateless functional component.
 *
 * @param {object} props
 */
const MainAreaNoResults = props => (
  <div className="main-area-no-results-container">
    <div className="main-area-no-results-title">{props.title}</div>
    <div className="main-area-no-results-subtitle">{props.subtitle}</div>
  </div>
);

MainAreaNoResults.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default MainAreaNoResults;
