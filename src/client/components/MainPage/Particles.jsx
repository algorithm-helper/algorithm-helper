import React from 'react';
import ParticlesJS from 'react-particles-js';

import particlesSettings from './particlesSettings.json';
import { mainPageParticleBg } from './styles.scss';

/**
 * Renders the Particles stateless functional component.
 *
 * @param {object} props
 */
const Particles = () => (
  <ParticlesJS
    params={particlesSettings}
    className={mainPageParticleBg}
  />
);

Particles.propTypes = {};

export default Particles;
