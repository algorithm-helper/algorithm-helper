import React from 'react';
import {
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
      isOpen: !this.state.isOpen
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
   * Renders the NavBar component.
   */
  render() {
    return (
      <Navbar fixed="top" className="navbar-main" dark expand="md">
        <NavbarBrand className="navbar-brand-title" tag={Link} to="/">Algorithmica</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
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

export default NavBar;
