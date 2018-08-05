import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';

// Components:
import NavBar from '../NavBar/';
import JumbotronMedium from '../JumbotronMedium/';
import ContentAreaTableOfContents from './ContentAreaTableOfContents';
import ContentAreaItemContainer from './ContentAreaItemContainer';

// Utils:
import i18n from '../../utils/i18n';
import { getCategory, getSubcategory } from '../../utils/dataUtils';
import { getContentUrlKey } from '../../utils/routeUtils';

// Data:
import data from '../../../data/index.json';
import colors from '../../../data/colors.json';

// Actions:
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

  configureDataByRouteParams(params) {
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
          // { title: 'Video', key: 'video' },
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
      // Categories:
      this.setState({ type: 'categories' });
      this.props.dispatch(resetColorTheme());
      data.categories.forEach(category => {
        const { title, key, description, colorKey } = category;
        const urlKey = `/categories/${key}`;
        const children = category.children.map(({ title, key }) => ({ title, key}));
        contentData.push({ title, key, description, children, colorKey, urlKey });
      });
      this.setState({ title: i18n.dynamicContentPage.categoriesTitle['en'] });
    }

    this.setState({ contentData });
  }

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
                        title={i18n.contentAreaTableOfContents.title['en']}
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
