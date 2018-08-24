import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { Col, Container, Row } from 'reactstrap';

import JumbotronMedium from 'components/JumbotronMedium';
import { getContentUrlKey } from 'utils/routeUtils';
import getColorFromKey from 'utils/getColorFromKey';
import { getTopicItemTypes } from 'utils/topicItemUtils';
import { setColorTheme, resetColorTheme } from 'actions/ColorThemeActions';

import ContentAreaTableOfContents from './ContentAreaTableOfContents';
import ContentAreaItemContainer from './ContentAreaItemContainer';

class ContentPage extends React.Component {
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

        this.setState({ contentData });
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

        this.setState({ contentData });
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
        });
      })
      .catch(err => this.setState({ error: err }));
  };

  /**
   * Renders the ContentPage component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <div className="content-page-container">
        <JumbotronMedium
          title={this.state.title}
        />

        {
          this.state.loading
            ? (
              <div className="content-page-loader">
                <MDSpinner
                  size={50}
                  singleColor={getColorFromKey(this.props.colorKey)}
                />
              </div>
            )
            : (
              <Container fluid>
                <Row>
                  <Col md="2" sm="2">
                    <ContentAreaTableOfContents
                      title="Content"
                      contentData={
                        this.state.contentData.map(item => ({
                          title: item.title,
                          key: item.key,
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
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(ContentPage);
