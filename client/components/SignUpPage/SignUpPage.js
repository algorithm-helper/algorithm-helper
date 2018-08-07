import React from 'react';
import { connect } from 'react-redux';
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

// Actions:
import { resetColorTheme } from '../../actions/ColorThemeActions';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldFullName: '',
      fieldEmail: '',
      fieldPassword: '',
      error: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  /**
   * Handles submitting with the given sign up information.
   */
  handleSignupClicked = () => {
    console.log('signup clicked');
    console.log(this.state.fieldFullName);
    console.log(this.state.fieldEmail);
    console.log(this.state.fieldPassword);
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
      <div>
        <Container className="container-full" fluid>
          <Row>
            <Col md="2"/>
            <Col md="8">
              <div className="mx-auto sign-up-page-card-container">
                <Card className="sign-up-page-card">
                  <CardBody>
                    <div className="sign-up-page-logo-container">
                      <img
                        className="sign-up-page-logo"
                        src="img/logo/logo-dark.png"
                        alt="Algorithmica Logo"
                      />
                    </div>

                    <div className="sign-up-page-title">
                      Sign Up For An Account
                    </div>

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
                      </FormGroup>

                      <FormGroup>
                        <i className="fa fa-lock prefix grey-text"/>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(SignUpPage);
