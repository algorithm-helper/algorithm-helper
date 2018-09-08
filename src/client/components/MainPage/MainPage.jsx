import React from 'react';
import { connect } from 'react-redux';

import Footer from 'components/Footer';
import { resetColorTheme } from 'actions/ColorThemeActions';
import { noop } from 'utils/utils';

import MainPageJumbotron from './MainPageJumbotron';
import MainArea from './MainArea';

import { mainPageContainer } from './styles.scss';

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
      fetch('/data/subcategories'),
      fetch('/data/utils/categories-color-key-mapping'),
    ])
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const [subcategories, colorKeyMapping] = result;

        const cardData = [];
        subcategories.data.forEach(subcategory => {
          const {
            key,
            title,
            description,
            imageUrl,
            parent,
          } = subcategory;
          const url = `/categories/${key}`;
          const colorKey = colorKeyMapping.data[parent];
          cardData.push({
            title,
            description,
            imageUrl,
            colorKey,
            url,
          });
        });

        this.setState({ cardData, loading: false });
      })
      .catch(noop);
  }

  /**
   * Renders the MainPage component.
   */
  render() {
    return (
      <div className={mainPageContainer}>
        <MainPageJumbotron
          title="Learn about algorithms and data structures."
          subtitle="Algorithm Helper is an educational resource for learning about algorithms, data structures, and software engineering topics."
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
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(MainPage);
