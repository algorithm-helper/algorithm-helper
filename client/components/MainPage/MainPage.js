import React from 'react';
import { connect } from 'react-redux';

import MainPageJumbotron from './MainPageJumbotron';
import MainArea from './MainArea';
import Footer from '../Footer/';

import { resetColorTheme } from '../../actions/ColorThemeActions';
import { noop } from '../../utils/utils';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
    this.requestSubcategoryData();
  }

  /**
   * Makes a request to the server to get the Subcategories data, as well as the Categories
   * color mapping between keys to colorKey's.
   */
  requestSubcategoryData() {
    Promise.all([
      fetch('http://localhost:5000/data/subcategories'),
      fetch('http://localhost:5000/data/utils/categories-color-key-mapping')
    ])
    .then(result => Promise.all(result.map(x => x.json())))
    .then(result => {
      const [subcategoriesData, categoriesColorKeyMapping] = result;

      const subcategories = subcategoriesData.data.sort((a, b) => a.order - b.order);
      const colorKeyMapping = categoriesColorKeyMapping.data.reduce((prev, curr) => ({
        ...prev,
        [curr.key]: curr.colorKey,
      }), {});

      const cardData = [];
      subcategories.forEach(subcategory => {
        const { key, title, description, imageUrl, parent } = subcategory;
        const url = `/categories/${key}`;
        const colorKey = colorKeyMapping[parent];
        cardData.push({ title, description, imageUrl, colorKey, url });
      });

      this.setState({ cardData, loading: true });
    })
    .catch(noop);
  }

  /**
   * Renders the MainPage component.
   */
  render() {
    return (
      <div className="main-page-container">
        <MainPageJumbotron
          title={'Learn about algorithms and data structures.'}
          subtitle={'Algorithm Helper is an educational resource for learning about algorithms, ' +
            'data structures, and software engineering topics.'}
        />
        <MainArea
          cardData={this.state.cardData}
          loading={this.state.loading}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(MainPage);
