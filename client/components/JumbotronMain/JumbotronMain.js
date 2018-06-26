import React from 'react';
import PropTypes from 'prop-types';
import Particles from '../Particles/';

/**
 * Renders the JumbotronMain stateless functional component.
 *
 * @param {object} props
 */
const JumbotronMain = props => (
  <div>
    <div className="jumbotron-main-particle-bg">
      <Particles />
    </div>
    <div className="container-fluid">
      <div className="row jumbotron-main">
        <div className="col-md-12">
          <div className="jumbotron-main-text-container">
            <div className="jumbotron-main-title">{props.title}</div>
            <div className="jumbotron-main-subtitle">{props.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

JumbotronMain.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default JumbotronMain;
