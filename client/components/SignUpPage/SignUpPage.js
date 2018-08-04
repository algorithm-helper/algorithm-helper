import React from 'react';
import { connect } from 'react-redux';

// Components:
// import Particles from '../Particles/';

// Actions:
import { resetColorTheme } from '../../actions/ColorThemeActions';

// Utils:
// import { signupValidation } from '../utils/validation.js';

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
        <div id="container-full-particle-bg">

        </div>
        <div className="container-fluid container-full">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 col-center">
              <div className="mx-auto container-sign-up">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <div className="ah-logo-container">
                        <img className="ah-logo-small" src="img/logo/algorithm-helper-logo-1000x1000.png" alt="Algorithm Helper Logo" />
                      </div>

                      <p className="h4 text-center py-4">Sign Up For An Account</p>
                      <div className="md-form">
                        <i className="fa fa-user prefix grey-text"></i>
                        <input
                          type="text"
                          id="materialFormCardNameEx"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldFullName')}
                        />
                        <label htmlFor="materialFormCardNameEx" className="font-weight-light">Full Name</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-envelope prefix grey-text"></i>
                        <input
                          type="email"
                          id="materialFormCardEmailEx"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldEmail')}
                        />
                        <label htmlFor="materialFormCardEmailEx" className="font-weight-light">Email</label>
                      </div>
                      <div className="md-form">
                        <i className="fa fa-lock prefix grey-text"></i>
                        <input
                          type="password"
                          id="materialFormCardPasswordEx"
                          className="form-control"
                          autoComplete="off"
                          onChange={e => this.handleFieldChanged(e, 'fieldPassword')}
                        />
                        <label htmlFor="materialFormCardPasswordEx" className="font-weight-light">Password</label>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <button
                          className="btn btn-deep-purple"
                          type="button"
                          onClick={this.handleSignupClicked}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(SignUpPage);

//           <Particles />
