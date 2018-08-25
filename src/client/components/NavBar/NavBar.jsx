import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Color from 'color';
import {
  Collapse,
  Input,
  InputGroup,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';

import Logo from 'components/Logo';

import getColorFromKey from 'utils/getColorFromKey';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchQuery: '',
    };
  }

  /**
   * Toggles the NavItems.
   */
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  /**
   * Handler for changes in the NavBar search field.
   *
   * @param {Event} e
   */
  onSearchChange = e => {
    const searchQuery = e.target.value.trim();
    this.setState({ searchQuery });
  };

  /**
   * Returns a lighter version of the current color theme using the `color` library. Used for making
   * the background color of the search bar slightly lighter.
   */
  getLightenedColorTheme = () => {
    const currentColor = getColorFromKey(this.props.colorKey);
    return Color(currentColor).lighten(0.15).hex();
  };

  /**
   * Renders the NavBar component.
   */
  render() {
    console.log(this.state.searchQuery);
    return (
      <Navbar
        fixed="top"
        className="navbar-main"
        dark
        expand="md"
        style={{ backgroundColor: getColorFromKey(this.props.colorKey) }}
      >
        <NavbarBrand className="navbar-brand-title" tag={Link} to="/">
          <div className="navbar-logo-container">
            <Logo
              height="40px"
              width="40px"
              light
            />
          </div>
          Algorithm Helper
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse
          isOpen={this.state.isOpen}
          navbar
          style={{ backgroundColor: getColorFromKey(this.props.colorKey) }}
        >
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="navbar-link" tag={Link} to="/categories">Categories</NavLink>
            </NavItem>
            <NavItem>
              <InputGroup>
                <Input
                  className="navbar-link navbar-search"
                  type="text"
                  aria-label="search"
                  placeholder="Search..."
                  style={{ backgroundColor: this.getLightenedColorTheme() }}
                  onChange={this.onSearchChange}
                />
              </InputGroup>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-link" tag={Link} to="/premium">Premium</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-link" tag={Link} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-link navbar-btn-signup" tag={Link} to="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default compose(
  connect(mapStateToProps),
)(NavBar);
