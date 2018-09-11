import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Particles from 'components/Particles';
import { resetColorTheme } from 'actions/ColorThemeActions';
import { handleAuthToken } from 'authentication';

import LoginPage from './LoginPage';

class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldEmail: '',
      fieldPassword: '',
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
   * Handles submitting with the given login information.
   */
  onLoginRequest = () => {
    try {
      // Reset all errors in the form:
      this.setState({
        isEmailError: false,
        isPasswordError: false,
        serverError: '',
      });

      this.validateFields();

      if (!this.state.isWaitingResponse) {
        this.setState({ isWaitingResponse: true });
        this.requestLogin();
      }
    } catch (errors) {
      errors.forEach(error => {
        this.setState({ [error.type]: true });
      });
    }
  };

  /**
   * Makes POST request to server to attempt to login with the given user credentials.
   */
  requestLogin = () => {
    fetch('/accounts/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      .catch(() => {
        this.setState({
          serverError: 'Invalid login credentials.',
          isWaitingResponse: false,
        });
      });
  };

  /**
   * Validates the input fields, and throws list of errors if any are invalid.
   */
  validateFields = () => {
    const errors = [];

    const email = this.state.fieldEmail.trim();
    if (email.length === 0) {
      const error = new Error('`email` field must not be empty.');
      error.type = 'isEmailError';
      errors.push(error);
    }

    const password = this.state.fieldPassword.trim();
    if (password.length === 0) {
      const error = new Error('`password` field must not be empty.');
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
   * Renders the LoginPage presentational component.
   */
  render() {
    if (this.state.success || this.props.userAccount.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <Particles shouldReload={false} />
        <LoginPage
          isEmailError={this.state.isEmailError}
          isPasswordError={this.state.isPasswordError}
          onFieldChanged={this.onFieldChanged}
          onLoginRequest={this.onLoginRequest}
          serverError={this.state.serverError}
        />
      </div>
    );
  }
}

LoginPageContainer.propTypes = {};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
  userAccount: state.userAccount,
});

export default connect(mapStateToProps)(LoginPageContainer);
