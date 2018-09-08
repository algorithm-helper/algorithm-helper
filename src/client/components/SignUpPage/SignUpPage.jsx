import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
  signUpPageCardContainer,
  signUpPageCard,
  signUpPageLogoContainer,
  signUpPageTitle,
  signUpPageForm,
  signUpPageLabel,
  signUpPageInput,
  signUpPageBtnRegisterContainer,
  signUpPageBtnRegister,
  signUpPageInputError,
  signUpPageServerError,
} from './styles.scss';

/**
 * Renders the SignUpPage stateless functional component.
 *
 * @param {object} props
 */
const SignUpPage = props => (
  <Container fluid>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={classnames('mx-auto', signUpPageCardContainer)}>
          <Card className={signUpPageCard}>
            <CardBody>
              <div className={signUpPageLogoContainer}>
                <Logo
                  width="100px"
                  height="100px"
                  dark
                />
              </div>

              <div className={signUpPageTitle}>
                Sign Up For An Account
              </div>

              {
                props.serverError
                && (
                  <div className={signUpPageServerError}>
                    {props.serverError}
                  </div>
                )
              }

              <Form className={signUpPageForm}>
                <FormGroup>
                  <i className="fa fa-user prefix grey-text" />
                  <label
                    htmlFor="sign-up-page-full-name"
                    className={signUpPageLabel}
                  >
                    Full Name
                  </label>
                  <InputGroup>
                    <Input
                      className={signUpPageInput}
                      type="email"
                      id="sign-up-page-full-name"
                      autoComplete="off"
                      onChange={e => props.onFieldChanged(e, 'fieldFullName')}
                    />
                  </InputGroup>
                  {
                    props.isFullNameError
                    && <div className={signUpPageInputError}>Cannot be empty.</div>
                  }
                </FormGroup>

                <FormGroup>
                  <i className="fa fa-envelope prefix grey-text" />
                  <label htmlFor="sign-up-page-email" className={signUpPageLabel}>
                    Email
                  </label>
                  <InputGroup>
                    <Input
                      className={signUpPageInput}
                      type="email"
                      id="sign-up-page-email"
                      autoComplete="off"
                      onChange={e => props.onFieldChanged(e, 'fieldEmail')}
                    />
                  </InputGroup>
                  {
                    props.isEmailError
                    && <div className={signUpPageInputError}>Must be a valid email.</div>
                  }
                </FormGroup>

                <FormGroup>
                  <i className="fa fa-lock prefix grey-text" />
                  <label
                    htmlFor="sign-up-page-password"
                    className={signUpPageLabel}
                  >
                    Password
                  </label>
                  <InputGroup>
                    <Input
                      className={signUpPageInput}
                      type="password"
                      id="sign-up-page-password"
                      autoComplete="off"
                      onChange={e => props.onFieldChanged(e, 'fieldPassword')}
                    />
                  </InputGroup>
                  {
                    props.isPasswordError
                    && (
                      <div className={signUpPageInputError}>
                        Must be at least 8 characters long.
                      </div>
                    )
                  }
                </FormGroup>
              </Form>

              <div className={signUpPageBtnRegisterContainer}>
                <Button
                  className={signUpPageBtnRegister}
                  color="primary"
                  onClick={props.onSignUpRequest}
                >
                  Register
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

SignUpPage.propTypes = {
  isEmailError: PropTypes.bool,
  isFullNameError: PropTypes.bool,
  isPasswordError: PropTypes.bool,
  onFieldChanged: PropTypes.func,
  onSignUpRequest: PropTypes.func,
  serverError: PropTypes.string,
};

export default SignUpPage;
