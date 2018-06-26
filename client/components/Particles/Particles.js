import React from 'react';
import 'particles.js';
import particlesOptions from './particlesOptions';

class Particles extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // TODO - fix this later
    // particlesJS('particles-container', particlesOptions);
  }

  render() {
    return (
      <div id="particles-container"></div>
    );
  }
}

export default Particles;
