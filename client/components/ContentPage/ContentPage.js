import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';

import NavBar from '../NavBar/';
import JumbotronMedium from '../JumbotronMedium/';
import ContentAreaTableOfContents from './ContentAreaTableOfContents';
import ContentAreaItemContainer from './ContentAreaItemContainer';
import i18n from '../../utils/i18n';
import { getCategory, getSubcategory } from '../../utils/dataUtils';
import { getContentUrlKey } from '../../utils/routeUtils';
import data from '../../../data/index.json';
import colors from '../../../data/colors.json';
import { setColorTheme, resetColorTheme } from '../../actions/ColorThemeActions';

class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      contentData: [],
      type: '',
      title: '',
      isError: false,
      loading: true,
    };
    this.configureDataByRouteParams = this.configureDataByRouteParams.bind(this);
  }

  componentWillMount() {
    this.configureDataByRouteParams(this.props.match.params);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  componentWillReceiveProps(newProps) {
    this.configureDataByRouteParams(newProps.match.params);

    const oldKey = getContentUrlKey(this.props.match.params).trim();
    const newKey = getContentUrlKey(newProps.match.params).trim();
    if (oldKey !== newKey) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  /**
   * Configures the content page dynamically based on the route parameters. If the parameters are
   * not valid, then it will redirect to the main page.
   * i.e
   * - categoryKey -> category page
   * - categoryKey, subcategoryKey -> subctegory page
   * - categoryKey, subcategoryKey, topicKey -> topic page
   *
   * @param {object} params
   */
  configureDataByRouteParams = params => {
    const { categoryKey, subcategoryKey, topicKey } = params;
    const contentData = [];

    if (categoryKey !== undefined && subcategoryKey !== undefined) {
      this.setState({ type: 'subcategory' });

      const categoryObj = getCategory(data, categoryKey);
      if (!categoryObj) {
        return this.setState({ error: true });
      }

      this.props.dispatch(setColorTheme(categoryObj.colorKey));

      const subcategoryObj = getSubcategory(categoryObj, subcategoryKey);
      if (!subcategoryObj) {
        return this.setState({ error: true });
      }

      subcategoryObj.children.forEach(topic => {
        const title = topic.title;
        const key = topic.key;
        const description = topic.description;
        const colorKey = categoryObj.colorKey;
        const urlKey = `/categories/${categoryObj.key}/${subcategoryObj.key}/${key}`;
        const children = [
          { title: 'Article', key: 'article' },
          { title: 'Code Implementations', key: 'code-implementations' },
        ];
        contentData.push({
          title,
          key,
          description,
          children,
          colorKey,
          urlKey,
          isTopicItem: true,
        });
      });
      this.setState({ title: subcategoryObj.title });
    } else if (categoryKey !== undefined) {
      this.setState({ type: 'category' });

      const categoryObj = getCategory(data, categoryKey);

      if (!categoryObj) {
        return this.setState({ error: true });
      }

      this.props.dispatch(setColorTheme(categoryObj.colorKey));

      categoryObj.children.forEach(subcategory => {
        const { title, key, description } = subcategory;
        const colorKey = categoryObj.colorKey;
        const urlKey = `/categories/${categoryObj.key}/${key}`;
        const children = subcategory.children.map(({ title, key }) => ({ title, key }));
        contentData.push({ title, key, description, children, colorKey, urlKey });
      });
      this.setState({ title: categoryObj.title });
    } else {
      this.setState({ type: 'categories' });
      this.props.dispatch(resetColorTheme());
      data.categories.forEach(category => {
        const { title, key, description, colorKey } = category;
        const urlKey = `/categories/${key}`;
        const children = category.children.map(({ title, key }) => ({ title, key}));
        contentData.push({ title, key, description, children, colorKey, urlKey });
      });
      this.setState({ title: 'Categories' });
    }

    this.setState({ contentData });
  };

  /**
   * Renders the ContentPage component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to={'/'} />
    }

    return (
      <div>
        <div className="container-main">

          <JumbotronMedium
            title={this.state.title}
            bgName="bg-main"
          />

          {
            this.state.loading ?
            (
              <div className="dynamic-content-page-loader">
                <MDSpinner
                  size={50}
                  singleColor={colors[this.props.colorKey]}
                />
              </div>
            ) :
            (
              <div className="container-fluid main-area">
                <div className="categories-container">
                  <div className="row">
                    <div className="col-md-2 col-sm-2">
                      <ContentAreaTableOfContents
                        title={'Content'}
                        contentData={
                          this.state.contentData.map(item => ({
                            title: item.title,
                            key: item.key
                          }))
                        }
                      />
                    </div>

                    <div className="col-md-8 col-sm-10">
                      <ContentAreaItemContainer
                        contentData={this.state.contentData}
                      />
                    </div>

                    <div className="col-md-2 col-sm-0"></div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(ContentPage);
