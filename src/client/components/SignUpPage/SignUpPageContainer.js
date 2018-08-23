import React from 'react';

import Particles from '../Particles/';

import SignUpPage from './SignUpPage';

/**
 * Renders the SignUpPageContainer stateless functional component.
 *
 * @param {object} props
 */
const SignUpPageContainer = props => (
  <div>
    <Particles/>
    <SignUpPage/>
  </div>
);

export default SignUpPageContainer;
