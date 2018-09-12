import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { setColorTheme } from 'actions/ColorThemeActions';
import { getItemIndexFromQueryString } from 'utils/routeUtils';
import { getTopicItemTypes } from 'utils/topicItemUtils';
import getColorFromKey from 'utils/getColorFromKey';

import TopicItemPage from './TopicItemPage';
import TopicItemArticle from './TopicItemArticle';
import TopicItemCode from './TopicItemCode';

class TopicItemPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategory: {},
      indexSelected: 0,
      topicItemTypes: [],
      error: '',
      isCompleted: false,
      isBookmarked: false,
      loading: false,
      topic: {},
    };
  }

  componentWillMount() {
    this.history = createHistory();
    this.setState({ loading: true, error: '' });
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
          loading: false,
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
   * Handles mark as completed for the current topic item. Note that this marks the item as
   * uncompleted (removes from user record) if the item is already completed.
   */
  onMarkAsCompleted = () => {
    if (!this.props.userAccount || !this.props.userAccount.isLoggedIn) {
      return;
    }

    const key = this.getCurrentKey();
    fetch('/actions/mark-as-completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': this.props.userAccount.authToken,
      },
      body: JSON.stringify({ key }),
    })
      .then(result => {
        if (!result) {
          throw result;
        }

        this.setState(prevState => ({ isCompleted: !prevState.isCompleted }));
      })
      .catch(() => { /* Ignore */ });
  };

  /**
   * Handles save to bookmarks for the current topic item. Note that this un-bookmarks the item
   * (removes from user record) if the item is already bookmarked.
   */
  onSaveToBookmarks = () => {
    if (!this.props.userAccount || !this.props.userAccount.isLoggedIn) {
      return;
    }

    const url = this.getCurrentUrl();
    fetch('/actions/save-to-bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': this.props.userAccount.authToken,
      },
      body: JSON.stringify({ url }),
    })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };


  /**
   * Returns the topic item component that corresponds to the topic item type.
   */
  getTopicItemComponent = () => {
    const topicItem = this.state.topicItemTypes[this.state.indexSelected];

    if (!topicItem) {
      return undefined;
    }

    // Collect items with the same type:
    const metaData = this.state.topic.children.filter(item => (
      item.type === topicItem.type
    ));

    switch (topicItem.type) {
      case 'article':
        return (
          <TopicItemArticle
            contentLoaded={this.onContentLoaded}
            type={topicItem.type}
          />
        );
      case 'code':
        return (
          <TopicItemCode
            contentLoaded={this.onContentLoaded}
            type={topicItem.type}
            metaData={metaData}
          />
        );
      default:
        return null;
    }
  };

  onContentLoaded = () => {
    this.setState({ loading: false });
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
        color={getColorFromKey(this.props.colorKey)}
        getTopicItemComponent={this.getTopicItemComponent}
        indexSelected={this.state.indexSelected}
        isCompleted={this.state.isCompleted}
        isBookmarked={this.state.isBookmarked}
        loading={this.state.loading}
        onChangeIndex={this.onChangeIndex}
        onMarkAsCompleted={this.onMarkAsCompleted}
        onSaveToBookmarks={this.onSaveToBookmarks}
        topic={this.state.topic}
        topicItemTypes={this.state.topicItemTypes}
        subcategory={this.state.subcategory}
        urlKey={`/categories/${this.state.subcategory.key}`}
        userAccount={this.props.userAccount}
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
