import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getContentUrlKey } from 'utils/routeUtils';
import getColorFromKey from 'utils/getColorFromKey';
import { getTopicItemTypes } from 'utils/topicItemUtils';
import { setColorTheme, resetColorTheme } from 'actions/ColorThemeActions';

import ContentPage from './ContentPage';

class ContentPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentData: [],
      title: '',
      loading: true,
      error: '',
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    this.configureDataByRouteParams(this.props.match.params);
  }

  componentWillReceiveProps(newProps) {
    const oldKey = getContentUrlKey(this.props.match.params).trim();
    const newKey = getContentUrlKey(newProps.match.params).trim();

    if (oldKey !== newKey) {
      window.scrollTo(0, 0);
      this.setState({ loading: true });
      this.configureDataByRouteParams(newProps.match.params);
    }
  }

  /**
   * Configures the content page dynamically based on the route parameters. If the parameters are
   * not valid, then it will redirect to the main page.
   * - none -> categories page
   * - categoryKey -> category page
   * - categoryKey, subcategoryKey -> subcategory page
   *
   * @param {object} params
   */
  configureDataByRouteParams = params => {
    const { categoryKey, subcategoryKey } = params;

    if (categoryKey && subcategoryKey) {
      this.requestSubcategoryData(categoryKey, subcategoryKey);
    } else if (categoryKey) {
      this.requestCategoryData(categoryKey);
    } else {
      this.requestCategoriesData();
    }
  };

  /**
   * Makes request to the server to get the data for a particular subcategory.
   *
   * @param {string} categoryKey
   * @param {string} subcategoryKey
   */
  requestSubcategoryData = (categoryKey, subcategoryKey) => {
    let subcategory;
    Promise.all([
      fetch(`/data/extended/categories/${categoryKey}/${subcategoryKey}`),
      fetch('/data/utils/categories-color-key-mapping'),
    ])
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const [subcategoryData, colorKeyMapping] = result;
        if (result.error) {
          throw result;
        }

        subcategory = subcategoryData.data;

        this.props.dispatch(setColorTheme(colorKeyMapping.data[subcategory.parent]));
        this.setState({ title: subcategory.title });

        return Promise.all(subcategory.children.map(topic => (
          fetch(`/data/categories/${categoryKey}/${subcategory.slug}/${topic.slug}`)
        )));
      })
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const contentData = [];
        result.forEach(topic => {
          const {
            title,
            slug,
            description,
            children,
          } = topic.data;
          const { colorKey } = subcategory;
          const urlKey = `/categories/${subcategory.key}/${slug}`;
          contentData.push({
            title,
            description,
            children: getTopicItemTypes(children),
            colorKey,
            urlKey,
            key: slug,
            isTopicItem: true,
          });
        });

        this.setState({ contentData, loading: false });
      })
      .catch(err => this.setState({ error: err }));
  };

  /**
   * Makes request to the server to get the data for a particular category.
   *
   * @param {string} categoryKey
   */
  requestCategoryData = categoryKey => {
    let category;
    fetch(`/data/extended/categories/${categoryKey}`)
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          throw result;
        }

        category = result.data;

        this.props.dispatch(setColorTheme(category.colorKey));
        this.setState({ title: category.title });

        return Promise.all(category.children.map(subcategory => (
          fetch(`/data/extended/categories/${categoryKey}/${subcategory.slug}`)
        )));
      })
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const contentData = [];
        result.forEach(subcategory => {
          const { title, slug, description } = subcategory.data;
          const { colorKey } = category.colorKey;
          const urlKey = `/categories/${category.slug}/${slug}`;
          const children = subcategory.data.children.map(child => ({
            title: child.title,
            key: child.slug,
          }));
          contentData.push({
            title,
            description,
            children,
            colorKey,
            urlKey,
            key: slug,
            isTopicItem: false,
          });
        });

        this.setState({ contentData, loading: false });
      })
      .catch(err => this.setState({ error: err }));
  }

  /**
   * Makes request to the server to get all categories data.
   */
  requestCategoriesData = () => {
    this.props.dispatch(resetColorTheme());

    fetch('/data/extended/categories')
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          throw result;
        }

        const contentData = [];
        result.data.forEach(category => {
          const {
            title,
            key,
            description,
            colorKey,
          } = category;
          const urlKey = `/categories/${key}`;
          const children = category.children.map(child => ({
            title: child.title,
            key: child.slug,
          }));
          contentData.push({
            title,
            key,
            description,
            children,
            colorKey,
            urlKey,
            isTopicItem: false,
          });
        });

        this.setState({
          contentData,
          title: 'Categories',
          loading: false,
        });
      })
      .catch(err => this.setState({ error: err }));
  };

  /**
   * Renders the ContentPage presentational component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <ContentPage
        color={getColorFromKey(this.props.colorKey)}
        contentData={this.state.contentData}
        contentDataTableOfContents={
          this.state.contentData.map(item => ({
            title: item.title,
            key: item.key,
          }))
        }
        loading={this.state.loading}
        title={this.state.title}
      />
    );
  }
}

ContentPageContainer.propTypes = {
  colorKey: PropTypes.number,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(ContentPageContainer);
