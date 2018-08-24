import React from 'react';
import ParticlesJS from 'react-particles-js';

import particlesSettings from './particlesSettings.json';

/**
 * Renders the Particles stateless functional component.
 *
 * @param {object} props
 */
const Particles = () => (
  <ParticlesJS
    params={particlesSettings}
    className="main-page-particle-bg"
  />
);

Particles.propTypes = {};

export default Particles;
