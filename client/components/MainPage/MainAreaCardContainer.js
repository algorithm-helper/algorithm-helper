import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the MainAreaCardContainer stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCardContainer = props => (
  <div className="main-area-card-deck-container">
    <div className="row">
      {
        !props.children || props.children.length > 0 ?
        props.children.map((child, i) => (
          <div className="col-md-4" key={i}>
            {child}
          </div>
        )) :
        props.children
      }
    </div>
  </div>
);

export default MainAreaCardContainer;
