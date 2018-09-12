import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { setColorTheme } from 'actions/ColorThemeActions';
import { getItemIndexFromQueryString } from 'utils/routeUtils';
import { getTopicItemTypes } from 'utils/topicItemUtils';

import TopicItemPage from './TopicItemPage';

class TopicItemPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      subcategory: {},
      indexSelected: 0,
      topicItemTypes: [],
      error: '',
      isCompleted: false,
      isBookmarked: false,
    };
  }

  componentWillMount() {
    this.history = createHistory();
    this.setState({ error: '' });
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    this.requestTopicData(categoryKey, subcategoryKey, topicKey);

    this.requestCompletionData();
  }

  /**
   * Makes request to the server to get the data for a particular topic.
   *
   * @param {string} categoryKey
   * @param {string} subcategoryKey
   * @param {string} topicKey
   */
  requestTopicData = (categoryKey, subcategoryKey, topicKey) => {
    Promise.all([
      fetch(`/data/categories/${categoryKey}/${subcategoryKey}/${topicKey}`),
      fetch(`/data/categories/${categoryKey}/${subcategoryKey}`),
      fetch(`/data/categories/${categoryKey}`),
    ])
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const [topicData, subcategoryData, categoryData] = result;

        if (topicData.error || subcategoryData.error || categoryData.error) {
          throw result;
        }

        this.props.dispatch(setColorTheme(categoryData.data.colorKey));
        const topicItemTypes = getTopicItemTypes(topicData.data.children);
        this.setState({
          topic: topicData.data,
          subcategory: subcategoryData.data,
          topicItemTypes,
        });
        this.fixQueryString(topicItemTypes);
      })
      .catch(err => this.setState({ error: err }));
  };

  /**
   * Check if this TopicItem is already completed or bookmarked.
   */
  requestCompletionData = () => {
    if (!this.props.userAccount || !this.props.userAccount.isLoggedIn) {
      return;
    }

    fetch('/actions/get-completion-items', {
      method: 'POST',
      headers: {
        'X-Auth': this.props.userAccount.authToken,
      },
    })
      .then(result => result.json())
      .then(result => {
        const { completedItems, bookmarks } = result.data;

        const key = this.getCurrentKey();
        const url = this.getCurrentUrl();

        console.log(key, url);

        const isCompleted = !!completedItems.find(elem => elem.key === key);
        const isBookmarked = !!bookmarks.find(elem => elem.url === url);
        this.setState({ isCompleted, isBookmarked });
      })
      .catch(() => { /* Ignore */ });
  };

  /**
   * Fixes the query string if its index is out of bounds, and fixes the currently selected
   * index for the TopicItemNavbar.
   *
   * @param {array} topicItemTypes
   */
  fixQueryString = topicItemTypes => {
    const indexFromQueryString = getItemIndexFromQueryString(this.props.location.search);

    if (indexFromQueryString !== undefined && indexFromQueryString >= 0
      && indexFromQueryString < topicItemTypes.length) {
      this.setState({ indexSelected: indexFromQueryString });
    } else {
      this.history.replace({ pathname: this.props.match.url, search: '?item=0' });
      this.setState({ indexSelected: 0 });
    }
  };

  /**
   * Returns the current key given the match params.
   */
  getCurrentKey = () => {
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    return `${categoryKey}/${subcategoryKey}/${topicKey}`;
  };

  /**
   * Returns the current url given the match params and indexSelected.
   */
  getCurrentUrl = () => {
    const key = this.getCurrentKey();
    return `${key}?item=${this.state.indexSelected}`;
  };

  /**
   * Handles changing the index for the TopicItemNavbar.
   *
   * @param {number} index
   */
  onChangeIndex = index => {
    this.setState({ indexSelected: index });
    this.history.push({
      pathname: this.props.match.url,
      search: `?item=${index}`,
    });
  };

  /**
   * Handles mark as completed for the current topic item.
   */
  onMarkAsCompleted = () => {
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;

    // console.log(this.props.match.params);
    // const params = this.getCurrentKeyParameters();
    // console.log(params);
    console.log('test completed');
  };

  /**
   * Handles save to bookmarks for the current topic item.
   */
  onSaveToBookmarks = () => {
    // TODO
    console.log('test bookmarks');
  };

  /**
   * Renders the TopicItemPage presentational component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <TopicItemPage
        indexSelected={this.state.indexSelected}
        isCompleted={this.state.isCompleted}
        isBookmarked={this.state.isBookmarked}
        onChangeIndex={this.onChangeIndex}
        onMarkAsCompleted={this.onMarkAsCompleted}
        onSaveToBookmarks={this.onSaveToBookmarks}
        topic={this.state.topic}
        topicItemTypes={this.state.topicItemTypes}
        subcategory={this.state.subcategory}
        urlKey={`/categories/${this.state.subcategory.key}`}
      />
    );
  }
}

TopicItemPageContainer.propTypes = {};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
  userAccount: state.userAccount,
});

export default connect(mapStateToProps)(TopicItemPageContainer);
