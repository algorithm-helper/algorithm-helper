import React from 'react';
import PropTypes from 'prop-types';

import logoSettings from './logoSettings.json';

const Logo = props => (
  <img
    className="logo"
    src={logoSettings.src}
    style={{
      width: props.width || 100,
      height: props.height || 100,
    }}
    alt={logoSettings.src}
  />
);

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Logo;
