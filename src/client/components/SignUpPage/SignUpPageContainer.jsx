import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import Particles from 'components/Particles';
import { MIN_PASSWORD_LENGTH } from 'settings/signupSettings';
import { resetColorTheme } from 'actions/ColorThemeActions';
import { handleAuthToken } from 'authentication';

import SignUpPage from './SignUpPage';

class SignUpPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldFullName: '',
      fieldEmail: '',
      fieldPassword: '',
      isFullNameError: false,
      isEmailError: false,
      isPasswordError: false,
      serverError: '',
      isWaitingResponse: false,
      success: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  /**
   * Handles submitting with the given sign up information.
   */
  onSignUpRequest = () => {
    try {
      // Reset all errors in the form:
      this.setState({
        isFullNameError: false,
        isEmailError: false,
        isPasswordError: false,
        serverError: '',
      });

      this.validateFields();

      if (!this.state.isWaitingResponse) {
        this.setState({ isWaitingResponse: true });
        this.requestSignUp();
      }
    } catch (errors) {
      errors.forEach(error => {
        this.setState({ [error.type]: true });
      });
    }
  };

  /**
   * Makes request to server to attempt to sign up user with the given information.
   */
  requestSignUp = () => {
    fetch('/accounts/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: this.state.fieldFullName,
        email: this.state.fieldEmail,
        password: this.state.fieldPassword,
      }),
    })
      .then(result => {
        const { headers } = result;
        const authToken = headers.get('X-Auth');
        handleAuthToken(authToken, this.props.dispatch);
        return result.json();
      })
      .then(result => {
        if (result.error) {
          throw result;
        }

        this.setState({ success: true, isWaitingResponse: false });
      })
      .catch(err => {
        let serverError;

        if (!err) {
          serverError = 'There was a problem signing up your account.';
        }

        if (err.error && err.error.code === 11000) {
          serverError = 'A user with this email already exists.';
        }

        this.setState({ serverError, isWaitingResponse: false });
      });
  };

  /**
   * Validates the input fields, and throws list of errors if any are invalid.
   */
  validateFields = () => {
    const errors = [];

    const fullName = this.state.fieldFullName.trim();
    if (fullName.length === 0) {
      const error = new Error('`fullName` field must not be empty.');
      error.type = 'isFullNameError';
      errors.push(error);
    }

    const email = this.state.fieldEmail.trim();
    if (!validator.isEmail(email)) {
      const error = new Error('`email` field must be a valid email.');
      error.type = 'isEmailError';
      errors.push(error);
    }

    const password = this.state.fieldPassword.trim();
    if (password.length < MIN_PASSWORD_LENGTH) {
      const error = new Error(`\`password\` field must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      error.type = 'isPasswordError';
      errors.push(error);
    }

    if (errors.length > 0) {
      throw errors;
    }
  };

  /**
   * Handles the change the field with the given key.
   *
   * @param {Event} e
   * @param {string} fieldKey
   */
  onFieldChanged = (e, fieldKey) => {
    const text = e.target.value.trim();
    this.setState({ [fieldKey]: text });
  };

  /**
   * Renders the SignUpPage presentational component.
   */
  render() {
    if (this.state.success || this.props.userAccount.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <Particles shouldReload={false} />
        <SignUpPage
          isEmailError={this.state.isEmailError}
          isFullNameError={this.state.isFullNameError}
          isPasswordError={this.state.isPasswordError}
          onFieldChanged={this.onFieldChanged}
          onSignUpRequest={this.onSignUpRequest}
          serverError={this.state.serverError}
        />
      </div>
    );
  }
}

SignUpPageContainer.propTypes = {};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
  userAccount: state.userAccount,
});

export default connect(mapStateToProps)(SignUpPageContainer);
