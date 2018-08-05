import React from 'react';
import ParticlesJS from 'react-particles-js';

import particlesSettings from './settings.json';

/**
 * Renders the Particles stateless functional component.
 *
 * @param {object} props
 */
const Particles = props => {
  return (
    <ParticlesJS
      params={particlesSettings}
      className="main-page-particle-bg"
    />
  );
};

export default Particles;
