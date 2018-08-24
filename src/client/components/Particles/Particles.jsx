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
    className="particles-bg"
  />
);

Particles.propTypes = {};

export default Particles;
