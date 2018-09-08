import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getColorFromKey from 'utils/getColorFromKey';
import getLightenedColor from 'utils/getLightenedColor';

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
    if (e.key === 'Enter') {
      // TODO
    }
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
        isOpen={this.state.isOpen}
        onEnterKeyPressed={this.onEnterKeyPressed}
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
});

export default connect(mapStateToProps)(NavBarContainer);
