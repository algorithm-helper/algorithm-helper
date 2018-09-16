import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import getTopicUrlFromKey from 'utils/getTopicUrlFromKey';
import { resetColorTheme } from 'actions/ColorThemeActions';
import { setSearchQuery } from 'actions/SearchActions';
import getColorFromKey from 'utils/getColorFromKey';
import { noop } from 'utils/utils';

import SearchHeader from './SearchHeader';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { searchPageContainer } from './styles.scss';
import SearchItemContainer from './SearchItemContainer';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchQuery: '',
      searchResults: [],
      currentSearchQuery: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ currentSearchQuery: this.props.searchQuery, loading: true });
    this.requestSearchResults(this.props.searchQuery);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchQuery !== this.state.currentSearchQuery) {
      this.setState({ currentSearchQuery: newProps.searchQuery, loading: true });
      this.requestSearchResults(newProps.searchQuery);
    }
  }

  /**
   * Handles change in the search bar.
   *
   * @param {Event} e
   */
  onSearchChange = e => {
    const searchQuery = e.target.value.trim().toLowerCase();
    this.setState({ searchQuery });
  };

  /**
   * Handles when the 'enter' key is pressed in the search bar.
   *
   * @param {Event} e
   */
  onEnterKeyPressed = e => {
    if (e.key === 'Enter') {
      this.props.dispatch(setSearchQuery(this.state.searchQuery));
    }
  }

  /**
   * Makes a request to the server to get the search results for the given search query.
   *
   * @param {string} query
   */
  requestSearchResults = query => {
    fetch('/search/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(result => result.json())
      .then(result => {
        const searchResults = result.data.map(elem => ({
          ...elem,
          url: getTopicUrlFromKey(elem.key),
        }));

        this.setState({
          loading: false,
          searchResults,
        });
      })
      .catch(noop);
  };

  render() {
    return (
      <Container
        fluid
        className={searchPageContainer}
      >
        <Row>
          <Col md="2" />
          <Col md="8">
            <SearchHeader
              title="Search"
            />

            <SearchBar
              onSearchChange={this.onSearchChange}
              onEnterKeyPressed={this.onEnterKeyPressed}
              searchPlaceholder="Enter a search term..."
            />

            <SearchResults
              numResults={this.state.searchResults.length}
            />

            <SearchItemContainer
              color={getColorFromKey(this.props.colorKey)}
              loading={this.state.loading}
              searchItems={this.state.searchResults}
            />
          </Col>
          <Col md="2" />
        </Row>
      </Container>
    );
  }
}

SearchPage.propTypes = {};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
  searchQuery: state.searchQuery,
});

export default connect(mapStateToProps)(SearchPage);
