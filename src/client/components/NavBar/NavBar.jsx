import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
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

import {
  navbarMain,
  navbarBrandTitle,
  navbarLogoContainer,
  navbarLink,
  navbarSearch,
  navbarBtnSignup,
} from './styles.scss';

/**
 * Renders the NavBar stateless functional component.
 *
 * @param {object} props
 */
const NavBar = props => {
  let accountOptions;
  if (props.isLoggedIn) {
    accountOptions = (
      <React.Fragment>
        <NavItem>
          <NavLink
            className={navbarLink}
            tag={Link}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={navbarLink}
            tag={Link}
            onClick={props.onLogoutRequest}
            to="/"
          >
            Logout
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  } else {
    accountOptions = (
      <React.Fragment>
        <NavItem>
          <NavLink
            className={navbarLink}
            tag={Link}
            to="/login"
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(navbarLink, navbarBtnSignup)}
            tag={Link}
            to="/signup"
          >
            Sign Up
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  }

  return (
    <Navbar
      fixed="top"
      className={navbarMain}
      dark
      expand="md"
      style={{ backgroundColor: props.color }}
    >
      <NavbarBrand
        className={navbarBrandTitle}
        tag={Link}
        to="/"
      >
        <div className={navbarLogoContainer}>
          <Logo
            height="40px"
            width="40px"
            light
          />
        </div>
        Algorithm Helper
      </NavbarBrand>
      <NavbarToggler onClick={props.onToggleRequest} />
      <Collapse
        isOpen={props.isOpen}
        navbar
        style={{ backgroundColor: props.color }}
      >
        <Nav
          className="ml-auto"
          navbar
        >
          <NavItem>
            <NavLink
              className={navbarLink}
              tag={Link}
              to="/categories"
            >
              Categories
            </NavLink>
          </NavItem>
          <NavItem>
            <InputGroup>
              <Input
                className={classnames(navbarLink, navbarSearch)}
                type="text"
                aria-label="search"
                placeholder="Search..."
                style={{ backgroundColor: props.colorLightened }}
                onChange={props.onSearchChange}
                onKeyPress={props.onEnterKeyPressed}
              />
            </InputGroup>
          </NavItem>
          {accountOptions}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  color: PropTypes.string,
  colorLightened: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isOpen: PropTypes.bool,
  onEnterKeyPressed: PropTypes.func,
  onLogoutRequest: PropTypes.func,
  onSearchChange: PropTypes.func,
  onToggleRequest: PropTypes.func,
};

export default NavBar;
