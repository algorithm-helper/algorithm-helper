import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
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

import { MIN_PASSWORD_LENGTH } from '../../settings/signupSettings';
import { resetColorTheme } from '../../actions/ColorThemeActions';

class SignUpPage extends React.Component {
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
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  /**
   * Handles submitting with the given sign up information.
   */
  handleSignupClicked = () => {
    try {
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
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
      this.setState({ isWaitingResponse: false });
    })
    .catch(err => {
      console.log(err);
      this.setState({ isWaitingResponse: false });
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
  handleFieldChanged = (e, fieldKey) => {
    const text = e.target.value.trim();
    this.setState({ [fieldKey]: text });
  };

  /**
   * Renders the SignUpPage component.
   */
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="2"/>
          <Col md="8">
            <div className="mx-auto sign-up-page-card-container">
              <Card className="sign-up-page-card">
                <CardBody>
                  <div className="sign-up-page-logo-container">
                    <Logo
                      width="100px"
                      height="100px"
                      dark
                    />
                  </div>

                  <div className="sign-up-page-title">
                    Sign Up For An Account
                  </div>

                  {
                    this.state.serverError &&
                    <div className="sign-up-page-server-error">
                      {this.state.serverError}
                    </div>
                  }

                  <Form className="sign-up-page-form">
                    <FormGroup>
                      <i className="fa fa-user prefix grey-text"/>
                      <label htmlFor="sign-up-page-full-name" className="sign-up-page-label">
                        Full Name
                      </label>
                      <InputGroup>
                        <Input
                          className="sign-up-page-input"
                          type="email"
                          id="sign-up-page-full-name"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldFullName')}
                        />
                      </InputGroup>
                      {
                        this.state.isFullNameError &&
                        <div className="sign-up-page-input-error">Cannot be empty.</div>
                      }
                    </FormGroup>

                    <FormGroup>
                      <i className="fa fa-envelope prefix grey-text"/>
                      <label htmlFor="sign-up-page-email" className="sign-up-page-label">
                        Email
                      </label>
                      <InputGroup>
                        <Input
                          className="sign-up-page-input"
                          type="email"
                          id="sign-up-page-email"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldEmail')}
                        />
                      </InputGroup>
                      {
                        this.state.isEmailError &&
                        <div className="sign-up-page-input-error">Must be a valid email.</div>
                      }
                    </FormGroup>

                    <FormGroup>
                      <i className="fa fa-lock prefix grey-text"/>
                      <label htmlFor="sign-up-page-password" className="sign-up-page-label">
                        Password
                      </label>
                      <InputGroup>
                        <Input
                          className="sign-up-page-input"
                          type="password"
                          id="sign-up-page-password"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldPassword')}
                        />
                      </InputGroup>
                      {
                        this.state.isPasswordError &&
                        <div className="sign-up-page-input-error">Must be at least 8 characters long.</div>
                      }
                    </FormGroup>
                  </Form>

                  <div className="sign-up-page-btn-register-container">
                    <Button
                      className="sign-up-page-btn-register"
                      color="secondary"
                      onClick={this.handleSignupClicked}>
                      Register
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

export default connect(mapStateToProps)(SignUpPage);
