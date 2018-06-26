import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the MainContainer stateless functional component.
 *
 * @param {object} props
 */
const MainContainer = props => (
  <div className="container-main">
    {props.children}
  </div>
);

export default MainContainer;
