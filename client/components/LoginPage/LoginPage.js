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

import { resetColorTheme } from '../../actions/ColorThemeActions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldEmail: '',
      fieldPassword: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  /**
   * Handles submitting with the given login information.
   */
  handleLoginClicked = () => {
    console.log('login clicked');
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
   * Renders the LoginPage component.
   */
  render() {
    return (
      <div>
        <Container className="container-full" fluid>
          <Row>
            <Col md="2"/>
            <Col md="8">
              <div className="mx-auto login-page-card-container">
                <Card className="login-page-card">
                  <CardBody>
                    <div className="login-page-logo-container">
                      <img
                        className="login-page-logo"
                        src="img/logo/logo-dark.png"
                        alt="Algorithmica Logo"
                      />
                    </div>

                    <div className="login-page-title">
                      Login To Your Account
                    </div>

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
                      </FormGroup>
                    </Form>

                    <div className="login-page-btn-login-container">
                      <Button
                        className="login-page-btn-login"
                        color="secondary"
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(LoginPage);
