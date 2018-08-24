import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import JumbotronSmall from 'components/JumbotronSmall';
import { setColorTheme } from 'actions/ColorThemeActions';
import { getItemIndexFromQueryString } from 'utils/routeUtils';
import { getTopicItemTypes } from 'utils/topicItemUtils';

import TopicItemNavBar from './TopicItemNavBar';
import TopicItemContainer from './TopicItemContainer';

class TopicItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      subcategory: {},
      indexSelected: 0,
      topicItemTypes: [],
      error: '',
    };
  }

  componentWillMount() {
    this.history = createHistory();
    this.setState({ error: '' });
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    this.requestTopicData(categoryKey, subcategoryKey, topicKey);
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
   * Fixes the query string if its index is out of bounds, and fixes the currently selected
   * index for the TopicItemNavbar.
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
   * Handles changing the index for the TopicItemNavbar.
   */
  handleChangeIndex = index => {
    this.setState({ indexSelected: index });
    this.history.push({
      pathname: this.props.match.url,
      search: `?item=${index}`,
    });
  };

  /**
   * Returns the key parameters for this current topic item, including the type (`article`, `code`,
   * etc.)
   */
  getCurrentKeyParameters = () => {
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    const topicItemType = this.state.topicItemTypes[this.state.indexSelected].type;
    return {
      categoryKey,
      subcategoryKey,
      topicKey,
      topicItemType,
    };
  };

  /**
   * Handles mark as completed for the current topic item.
   */
  handleMarkAsCompleted = () => {
    const params = this.getCurrentKeyParameters();
    console.log(params);
  };

  /**
   * Handles save to bookmarks for the current topic item.
   */
  handleSaveToBookmarks = () => {
    const params = this.getCurrentKeyParameters();
    console.log(params);
  };

  /**
   * Renders the TopicItemPage component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <div className="topic-item-page-container">
        <JumbotronSmall
          title={this.state.topic.title}
          subtitle={this.state.subcategory.title}
          urlKey={`/categories/${this.state.subcategory.key}`}
        />

        <TopicItemNavBar
          indexStart={this.state.indexSelected}
          handleChangeIndex={this.handleChangeIndex}
          topicItemTypes={this.state.topicItemTypes}
        />

        <TopicItemContainer
          topic={this.state.topic}
          topicItem={this.state.topicItemTypes[this.state.indexSelected]}
          onMarkAsCompleted={this.handleMarkAsCompleted}
          onSaveToBookmarks={this.handleSaveToBookmarks}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(TopicItemPage);
