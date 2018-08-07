import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';

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
    this.handleSignupClicked = this.handleSignupClicked.bind(this);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  handleSignupClicked() {
    console.log('signup clicked');
    console.log(this.state.fieldFullName);
    console.log(this.state.fieldEmail);
    console.log(this.state.fieldPassword);
  }

  handleFieldChanged(e, fieldKey) {
    const text = e.target.value.trim();
    this.setState({
      [fieldKey]: text
    });
  }

  render() {
    return (
      <div>
        <Container className="container-full" fluid>
          <Row>
            <Col md="2"/>
            <Col className="col-center" md="8">
              <div className="mx-auto container-sign-up">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <div className="ah-logo-container">
                        <img
                          className="ah-logo-small"
                          src="img/logo/algorithm-helper-logo-1000x1000.png"
                          alt="Algorithm Helper Logo"
                          style={{
                            width: '50%',
                            textAlign: 'center',
                          }}/>
                      </div>

                      <p className="h4 text-center py-4">
                        Sign Up For An Account
                      </p>
                      <div className="md-form">
                        <i className="fa fa-user prefix grey-text"/>
                        <label htmlFor="sign-up-page-full-name" className="font-weight-light">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="sign-up-page-full-name"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldFullName')}
                        />
                      </div>
                      <div className="md-form">
                        <i className="fa fa-envelope prefix grey-text"/>
                        <label htmlFor="sign-up-page-email" className="font-weight-light">
                          Email
                        </label>
                        <input
                          type="email"
                          id="sign-up-page-email"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldEmail')}
                        />
                      </div>
                      <div className="md-form">
                        <i className="fa fa-lock prefix grey-text"/>
                        <label htmlFor="sign-up-page-password" className="font-weight-light">
                          Password
                        </label>
                        <input
                          type="password"
                          id="sign-up-page-password"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldPassword')}
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <Button
                          className="sign-up-page-btn-register"
                          onClick={this.handleSignupClicked}>
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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

//           <Particles />
