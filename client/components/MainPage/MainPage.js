import React from 'react';
import { connect } from 'react-redux';

import MainPageJumbotron from './MainPageJumbotron';
import MainArea from './MainArea';
import Footer from '../Footer/';
import { resetColorTheme } from '../../actions/ColorThemeActions';
import data from '../../../data/index.json';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());

    const cardData = [];
    data.categories.forEach(category => {
      const colorKey = category.colorKey;
      category.children.forEach(subcategory => {
        const { title, description, imageUrl } = subcategory;
        const url = `/categories/${category.key}/${subcategory.key}`;
        cardData.push({ title, description, imageUrl, colorKey, url });
      });
    });
    this.setState({ cardData });
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
