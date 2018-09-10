import React from 'react';
import PropTypes from 'prop-types';
import ParticlesJS from 'react-particles-js';

import { particlesStyles } from './styles.scss';
import particlesSettings from './particlesSettings.json';

class Particles extends React.Component {
  shouldComponentUpdate() {
    return this.props.shouldReload;
  }

  render() {
    return (
      <ParticlesJS
        params={particlesSettings}
        className={particlesStyles}
      />
    );
  }
}

Particles.propTypes = {
  shouldReload: PropTypes.bool,
};

export default Particles;
