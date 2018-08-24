import React from 'react';
import PropTypes from 'prop-types';

import logoSettings from './logoSettings.json';

/**
 * Renders the Logo stateless functional component.
 *
 * @param {object} props
 */
const Logo = props => {
  let src;
  if (props.dark) {
    src = logoSettings.dark;
  }

  if (props.light) {
    src = logoSettings.light;
  }

  return (
    <img
      className="logo"
      src={src}
      style={{
        width: props.width || 100,
        height: props.height || 100,
      }}
      alt={logoSettings.alt}
    />
  );
};

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
};

export default Logo;
