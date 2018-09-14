import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import getTopicUrlFromKey from 'utils/getTopicUrlFromKey';
import { resetColorTheme } from 'actions/ColorThemeActions';
import getColorFromKey from 'utils/getColorFromKey';

import SearchHeader from './SearchHeader';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { searchPageContainer } from './styles.scss';
import SearchItemContainer from './SearchItemContainer';

const dummyData = [
  {
    topicKey: 'data-structures/lists/introduction',
    topicTitle: 'Introduction',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    textSnippet: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
  },
  {
    topicKey: 'data-structures/lists/linked-list',
    topicTitle: 'Linked List',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    textSnippet: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
  },
  {
    topicKey: 'data-structures/lists/stack',
    topicTitle: 'Stack',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    textSnippet: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
  },
  {
    topicKey: 'data-structures/lists/dynamic-array',
    topicTitle: 'Dynamic Array',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    textSnippet: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
  },
];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  /**
   * Handles change in the search bar.
   *
   * @param {Event} e
   */
  onSearchChange = e => {
    const searchQuery = e.target.value.trim().toLowerCase();
    console.log(searchQuery);
  };

  // eslint-disable-next-line
  getSearchItems = () => {
    return dummyData.map(elem => ({
      ...elem,
      url: getTopicUrlFromKey(elem.topicKey),
    }));
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
              searchPlaceholder="Enter a search term..."
            />

            <SearchResults
              numResults={0}
            />

            <SearchItemContainer
              color={getColorFromKey(this.props.colorKey)}
              loading={this.state.loading}
              searchItems={this.getSearchItems()}
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
});

export default connect(mapStateToProps)(SearchPage);
