import React from 'react';

import Particles from 'components/Particles';

import SignUpPage from './SignUpPage';

/**
 * Renders the SignUpPageContainer stateless functional component.
 *
 * @param {object} props
 */
const SignUpPageContainer = () => (
  <div>
    <Particles />
    <SignUpPage />
  </div>
);

export default SignUpPageContainer;
