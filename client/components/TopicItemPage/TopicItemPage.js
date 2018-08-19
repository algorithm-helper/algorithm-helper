import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';

import JumbotronSmall from '../JumbotronSmall/';
import TopicItemNavBar from './TopicItemNavBar';
import TopicItemContainer from './TopicItemContainer';

import { setColorTheme } from '../../actions/ColorThemeActions';

import data from '../../../data/index.json';

import { getCategory, getSubcategory, getTopic } from '../../utils/dataUtils';
import { getItemIndexFromQueryString } from '../../utils/routeUtils';

class TopicItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      category: {},
      subcategory: {},
      topic: {},
      indexSelected: 0,
      topicItems: [{
        type: 'article',
        topicItemId: '1',
      }, {
        type: 'code',
        topicItemId: '2',
      }],
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleMarkAsCompleted = this.handleMarkAsCompleted.bind(this);
    this.handleSaveToBookmarks = this.handleSaveToBookmarks.bind(this);
  }

  componentWillMount() {
    this.history = createHistory();

    const indexFromQueryString = getItemIndexFromQueryString(this.props.location.search);
    if (indexFromQueryString && indexFromQueryString >= 0 &&
      indexFromQueryString < this.state.topicItems.length) {
      this.setState({ indexSelected: indexFromQueryString });
    } else {
      this.history.replace({
        pathname: this.props.match.url,
        search: `?item=0`
      });
      this.setState({ indexSelected: 0 });
    }

    const category = getCategory(data, this.props.match.params.categoryKey);
    const subcategory = getSubcategory(category, this.props.match.params.subcategoryKey);
    const topic = getTopic(subcategory, this.props.match.params.topicKey);

    this.props.dispatch(setColorTheme(category.colorKey));
    this.setState({ category, subcategory, topic });

    // getTopicItemTypes
  }

  /**
   * Handles changing the index for the TopicItemNavbar.
   */
  handleChangeIndex = index => {
    this.setState({ indexSelected: index });
    this.history.push({
      pathname: this.props.match.url,
      search: `?item=${index}`
    });
  };

  /**
   * Returns the key parameters for this current topic item, including the type (`article`, `code`,
   * etc.)
   */
  getCurrentKeyParameters = () => {
    const categoryKey = this.state.category.key;
    const subcategoryKey = this.state.subcategory.key;
    const topicKey = this.state.topic.key;
    const topicItemType = this.state.topicItems[this.state.indexSelected].type;
    return { categoryKey, subcategoryKey, topicKey, topicItemType };
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
    return (
      <div className="topic-item-page-container">
        <JumbotronSmall
          title={this.state.topic.title}
          subtitle={this.state.subcategory.title}
          urlKey={`/categories/${this.state.category.key}/${this.state.subcategory.key}`}
        />

        <TopicItemNavBar
          indexStart={this.state.indexSelected}
          handleChangeIndex={this.handleChangeIndex}
        />

        <TopicItemContainer
          topicItem={this.state.topicItems[this.state.indexSelected]}
          onMarkAsCompleted={this.handleMarkAsCompleted}
          onSaveToBookmarks={this.handleSaveToBookmarks}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemPage);
