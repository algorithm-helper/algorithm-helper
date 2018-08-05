import React from 'react';
import { connect } from 'react-redux';

import MainPageJumbotron from './MainPageJumbotron';
import MainArea from './MainArea';

import data from '../../../data/index.json';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
    };
  }

  componentWillMount() {
    // Reset color theme

    // Get the card data for each of the subcategories:
    const cardData = [];
    data.categories.forEach(category => {
      const colorKey = category.colorKey;
      category.children.forEach(subcategory => {
        const { title, description } = subcategory;
        const url = `/categories/${category.key}/${subcategory.key}`;
        cardData.push({ title, description, colorKey, url });
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
          subtitle={'Algorithmica is an educational resource for learning about algorithms, ' +
            'data structures, and software engineering topics.'}
        />
        <MainArea
          cardData={this.state.cardData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(MainPage);
