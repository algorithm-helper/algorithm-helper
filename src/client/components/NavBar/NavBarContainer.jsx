import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getColorFromKey from 'utils/getColorFromKey';
import getLightenedColor from 'utils/getLightenedColor';
import { setSearchQuery } from 'actions/SearchActions';
import { handleAuthToken } from 'authentication';

import NavBar from './NavBar';

class NavBarContainer extends React.Component {
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
  onToggleRequest = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  /**
   * Handles changes in the search field.
   *
   * @param {Event} e
   */
  onSearchChange = e => {
    const searchQuery = e.target.value.trim();
    this.setState({ searchQuery });
  };

  /**
   * Handles when the enter key is pressed.
   *
   * @param {Event} e
   */
  onEnterKeyPressed = e => {
    this.props.dispatch(setSearchQuery(this.state.searchQuery));
    if (e.key === 'Enter' && this.state.searchQuery) {
      this.props.history.push('/search');
    }
  };

  /**
   * Logs out the current user.
   */
  onLogoutRequest = () => {
    if (!this.props.userAccount.isLoggedIn
      || !this.props.userAccount.authToken) {
      // Do nothing if this user is already logged out:
      return;
    }

    const { authToken } = this.props.userAccount;
    fetch('/accounts/logout', {
      method: 'POST',
      headers: {
        'X-Auth': authToken,
      },
    })
      .then(() => { /* Ignore */ })
      .catch(() => { /* Ignore */ })
      .finally(() => handleAuthToken(null, this.props.dispatch));
  };

  /**
   * Renders the NavBar presentational component.
   */
  render() {
    const color = getColorFromKey(this.props.colorKey);

    return (
      <NavBar
        color={color}
        colorLightened={getLightenedColor(color)}
        isLoggedIn={this.props.userAccount.isLoggedIn}
        isOpen={this.state.isOpen}
        onEnterKeyPressed={this.onEnterKeyPressed}
        onLogoutRequest={this.onLogoutRequest}
        onSearchChange={this.onSearchChange}
        onToggleRequest={this.onToggleRequest}
      />
    );
  }
}

NavBarContainer.propTypes = {
  colorKey: PropTypes.number,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
  userAccount: state.userAccount,
  searchQuery: state.searchQuery,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
)(NavBarContainer);
