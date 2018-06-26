import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';

// Components:
import JumbotronSmall from '../JumbotronSmall/';
import TopicItemNavBar from './TopicItemNavBar';
import TopicItemContainer from './TopicItemContainer';

// Actions:
import { setColorTheme } from '../../actions/ColorThemeActions';

// Data:
import data from '../../../data/index.json';

// Utils:
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

    // Need to update global colors:
    const categoryObj = getCategory(data, this.props.match.params.categoryKey);
    this.props.dispatch(setColorTheme(categoryObj.colorKey));

    // Query for parent subcategory, category:
    const subcategoryObj = getSubcategory(categoryObj, this.props.match.params.subcategoryKey);
    const topicObj = getTopic(subcategoryObj, this.props.match.params.topicKey);

    this.setState({
      category: categoryObj,
      subcategory: subcategoryObj,
      topic: topicObj,
    });
  }

  handleChangeIndex(index) {
    this.setState({ indexSelected: index });
    this.history.push({
      pathname: this.props.match.url,
      search: `?item=${index}`
    });
  }

  render() {
    return (
      <div>
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemPage);
