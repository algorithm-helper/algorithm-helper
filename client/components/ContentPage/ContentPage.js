import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { Col, Container, Row } from 'reactstrap';

import JumbotronMedium from '../JumbotronMedium/';
import ContentAreaTableOfContents from './ContentAreaTableOfContents';
import ContentAreaItemContainer from './ContentAreaItemContainer';

import { getCategory, getSubcategory } from '../../utils/dataUtils';
import { getContentUrlKey } from '../../utils/routeUtils';
import getColorFromKey from '../../utils/getColorFromKey';
import { setColorTheme, resetColorTheme } from '../../actions/ColorThemeActions';
import data from '../../../data/index.json';


class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentData: [],
      type: '',
      title: '',
      isError: false,
      loading: true,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
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
        const { title, key, description } = topic;
        const { colorKey } = categoryObj;
        const urlKey = `/categories/${categoryObj.key}/${subcategoryObj.key}/${key}`;
        const children = [{
          title: 'Article',
          key: 'article',
        }, {
          title: 'Code',
          key: 'code',
        }];
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

      this.setState({
        type: 'subcategory',
        title: subcategoryObj.title,
      });
    } else if (categoryKey !== undefined) {
      const categoryObj = getCategory(data, categoryKey);

      if (!categoryObj) {
        return this.setState({ error: true });
      }

      this.props.dispatch(setColorTheme(categoryObj.colorKey));

      categoryObj.children.forEach(subcategory => {
        const { title, key, description } = subcategory;
        const { colorKey } = categoryObj;
        const urlKey = `/categories/${categoryObj.key}/${key}`;
        const children = subcategory.children.map(({ title, key }) => ({ title, key }));
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
        type: 'category',
        title: categoryObj.title,
      });
    } else {
      this.props.dispatch(resetColorTheme());

      data.categories.forEach(category => {
        const { title, key, description, colorKey } = category;
        const urlKey = `/categories/${key}`;
        const children = category.children.map(({ title, key }) => ({ title, key}));
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
        type: 'categories',
        title: 'Categories',
      });
    }

    this.setState({ contentData });
  };

  /**
   * Renders the ContentPage component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to={'/'} />;
    }

    return (
      <div className="content-page-container">
        <JumbotronMedium
          title={this.state.title}
        />

        {
          this.state.loading
          ? <div className="content-page-loader">
              <MDSpinner
                size={50}
                singleColor={getColorFromKey(this.props.colorKey)}
              />
            </div>
          : <Container fluid>
              <Row>
                <Col md="2" sm="2">
                  <ContentAreaTableOfContents
                    title={'Content'}
                    contentData={
                      this.state.contentData.map(item => ({
                        title: item.title,
                        key: item.key
                      }))
                    }
                  />
                </Col>
                <Col md="8" sm="10">
                  <ContentAreaItemContainer
                    contentData={this.state.contentData}
                  />
                </Col>
                <Col md="2" sm="0" />
              </Row>
            </Container>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(ContentPage);
