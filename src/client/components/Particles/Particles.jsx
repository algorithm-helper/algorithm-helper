import React from 'react';
import ParticlesJS from 'react-particles-js';

import { particlesStyles } from './styles.scss';
import particlesSettings from './particlesSettings.json';

/**
 * Renders the Particles stateless functional component.
 *
 * @param {object} props
 */
const Particles = () => (
  <ParticlesJS
    params={particlesSettings}
    className={particlesStyles}
  />
);

Particles.propTypes = {};

export default Particles;
