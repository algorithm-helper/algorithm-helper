import React from 'react';
import PropTypes from 'prop-types';

import Particles from './Particles';

/**
 * Renders the MainPageJumbotron stateless functional component.
 *
 * @param {object} props
 */
const MainPageJumbotron = props => (
  <div className="main-page-jumbotron">
    <div className="main-page-jumbotron-text-container">
      <div className="main-page-jumbotron-title">
        {props.title}
      </div>
      <div className="main-page-jumbotron-subtitle">
        {props.subtitle}
      </div>
    </div>
    <Particles />
  </div>
);

MainPageJumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default MainPageJumbotron;
