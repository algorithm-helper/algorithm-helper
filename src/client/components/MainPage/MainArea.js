import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import MainAreaSearchBar from './MainAreaSearchBar';
import MainAreaCardContainer from './MainAreaCardContainer';
import MainAreaNoResults from './MainAreaNoResults';

import getColorFromKey from '../../utils/getColorFromKey';

class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      searchQuery: '',
      visibleCards: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.setState({
      cardData: this.props.cardData,
      visibleCards: this.props.cardData,
      loading: this.props.loading,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      cardData: newProps.cardData,
      visibleCards: newProps.cardData,
      loading: newProps.loading,
    });
  }

  /**
   * Normalizes the search query and filters the visibleCards.
   *
   * @param {Event} e
   */
  handleSearchChange = e => {
    const searchQuery = e.target.value.trim().replace(/\s/g, '').toLowerCase();

    // Get visible cards based on the search query:
    const visibleCards = this.state.cardData.filter(card => (
      card.title.trim().replace(/\s/g, '').toLowerCase().includes(searchQuery) ||
      card.description.trim().replace(/\s/g, '').toLowerCase().includes(searchQuery)
    ));

    this.setState({ searchQuery, visibleCards });
  };

  /**
   * Gets the empty items component (component to show when either the card data is loading or
   * when the search query yields no result).
   */
  getEmptyItemsComponent = () => {
    let component;
    if (this.state.loading) {
      component = (
        <div className="main-area-spinner-container">
          <MDSpinner
            size={50}
            singleColor={getColorFromKey(this.props.colorKey)}
          />
        </div>
      );
    } else {
      component = (
        <MainAreaNoResults
          title={'No results found.'}
          subtitle={'Try a different search term.'}
        />
      );
    }
    return component;
  };

  /**
   * Renders the MainArea component.
   */
  render() {
    return (
      <div className="main-area-container">
        <MainAreaSearchBar
          onSearchChange={this.handleSearchChange}
          searchPlaceholder={'Search for a topic...'}
        />
        {
          this.state.visibleCards.length > 0
          ? <MainAreaCardContainer
              cardData={this.state.visibleCards}
            />
          : this.getEmptyItemsComponent()
        }
      </div>
    );
  }
}

MainArea.propTypes = {
  cardData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(MainArea);
