import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';

import MainAreaSearchBar from './MainAreaSearchBar';
import MainAreaCardContainer from './MainAreaCardContainer';
import MainAreaNoResults from './MainAreaNoResults';

class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      searchQuery: '',
      visibleCards: [],
    };
  }

  componentWillMount() {
    this.setState({
      cardData: this.props.cardData,
      visibleCards: this.props.cardData,
    });
  }

  handleSearchChange = e => {
    const searchQuery = e.target.value.trim().replace(/\s/g, '').toLowerCase();

    // Get visible cards based on the search query:
    const visibleCards = this.state.cardData.filter(card => (
      card.title.trim().replace(/\s/g, '').toLowerCase().includes(searchQuery) ||
      card.description.trim().replace(/\s/g, '').toLowerCase().includes(searchQuery)
    ));

    this.setState({ searchQuery, visibleCards });
  };

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
          : <MainAreaNoResults
              title={'No results found.'}
              subtitle={'Try a different search term.'}
            />
        }
      </div>
    );
  }
}

MainArea.propTypes = {
  cardData: PropTypes.array.isRequired,
};

export default MainArea;
