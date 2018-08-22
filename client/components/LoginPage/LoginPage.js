import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Row,
} from 'reactstrap';

import Logo from '../Logo/';

import { resetColorTheme } from '../../actions/ColorThemeActions';

class LoginPage extends React.Component {
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
  handleLoginClicked = () => {
    try {
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
    .then(result => result.json())
    .then(result => {
      if (result.error) {
        throw result;
      }

      this.setState({ success: true, isWaitingResponse: false });
    })
    .catch(err => {
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
  handleFieldChanged = (e, fieldKey) => {
    const text = e.target.value.trim();
    this.setState({ [fieldKey]: text });
  };

  /**
   * Renders the LoginPage component.
   */
  render() {
    if (this.state.success) {
      return <Redirect to={'/dashboard'}/>;
    }

    return (
      <Container fluid>
        <Row>
          <Col md="2"/>
          <Col md="8">
            <div className="mx-auto login-page-card-container">
              <Card className="login-page-card">
                <CardBody>
                  <div className="login-page-logo-container">
                    <Logo
                      width="100px"
                      height="100px"
                      dark
                    />
                  </div>

                  <div className="login-page-title">
                    Login To Your Account
                  </div>

                  {
                    this.state.serverError &&
                    <div className="login-page-server-error">
                      {this.state.serverError}
                    </div>
                  }

                  <Form className="login-page-form">
                    <FormGroup>
                      <i className="fa fa-envelope prefix grey-text"/>
                      <label htmlFor="login-page-email" className="login-page-label">
                        Email
                      </label>
                      <InputGroup>
                        <Input
                          className="login-page-input"
                          type="email"
                          id="login-page-email"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldEmail')}
                        />
                      </InputGroup>
                      {
                        this.state.isEmailError &&
                        <div className="login-page-input-error">Cannot be empty.</div>
                      }
                    </FormGroup>

                    <FormGroup>
                      <i className="fa fa-lock prefix grey-text"/>
                      <label htmlFor="login-page-password" className="login-page-label">
                        Password
                      </label>
                      <InputGroup>
                        <Input
                          className="login-page-input"
                          type="password"
                          id="login-page-password"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldPassword')}
                        />
                      </InputGroup>
                      {
                        this.state.isPasswordError &&
                        <div className="login-page-input-error">Cannot be empty.</div>
                      }
                    </FormGroup>
                  </Form>

                  <div className="login-page-btn-login-container">
                    <Button
                      className="login-page-btn-login"
                      color="primary"
                      onClick={this.handleLoginClicked}>
                      Login
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md="2"/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(LoginPage);
