import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

import Logo from 'components/Logo';

import {
  loginPageCardContainer,
  loginPageCard,
  loginPageLogoContainer,
  loginPageTitle,
  loginPageForm,
  loginPageLabel,
  loginPageInput,
  loginPageBtnLoginContainer,
  loginPageBtnLogin,
  loginPageInputError,
  loginPageServerError,
} from './styles.scss';

/**
 * Renders the LoginPage stateless functional component.
 *
 * @param {object} props
 */
const LoginPage = props => (
  <Container fluid>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={classnames('mx-auto', loginPageCardContainer)}>
          <Card className={loginPageCard}>
            <CardBody>
              <div className={loginPageLogoContainer}>
                <Logo
                  width="100px"
                  height="100px"
                  dark
                />
              </div>

              <div className={loginPageTitle}>
                Login To Your Account
              </div>

              {
                props.serverError
                && (
                  <div className={loginPageServerError}>
                    {props.serverError}
                  </div>
                )
              }

              <Form className={loginPageForm}>
                <FormGroup>
                  <i className="fa fa-envelope prefix grey-text" />
                  <label
                    htmlFor="login-page-email"
                    className={loginPageLabel}
                  >
                    Email
                  </label>
                  <InputGroup>
                    <Input
                      className={loginPageInput}
                      type="email"
                      id="login-page-email"
                      autoComplete="off"
                      onChange={e => props.onFieldChanged(e, 'fieldEmail')}
                    />
                  </InputGroup>
                  {
                    props.isEmailError
                    && <div className={loginPageInputError}>Cannot be empty.</div>
                  }
                </FormGroup>

                <FormGroup>
                  <i className="fa fa-lock prefix grey-text" />
                  <label
                    htmlFor="login-page-password"
                    className={loginPageLabel}
                  >
                    Password
                  </label>
                  <InputGroup>
                    <Input
                      className={loginPageInput}
                      type="password"
                      id="login-page-password"
                      autoComplete="off"
                      onChange={e => props.onFieldChanged(e, 'fieldPassword')}
                    />
                  </InputGroup>
                  {
                    props.isPasswordError
                    && <div className={loginPageInputError}>Cannot be empty.</div>
                  }
                </FormGroup>
              </Form>

              <div className={loginPageBtnLoginContainer}>
                <Button
                  className={loginPageBtnLogin}
                  color="primary"
                  onClick={props.onLoginRequest}
                >
                  Login
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

LoginPage.propTypes = {
  isEmailError: PropTypes.bool,
  isPasswordError: PropTypes.bool,
  onFieldChanged: PropTypes.func,
  onLoginRequest: PropTypes.func,
  serverError: PropTypes.string,
};

export default LoginPage;
