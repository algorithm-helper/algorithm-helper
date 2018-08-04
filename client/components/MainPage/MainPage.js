import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from 'reactstrap';

// Components:
import NavBar from '../NavBar/';
import JumbotronMain from '../JumbotronMain/';
import MainArea from './MainArea';
import Particles from './Particles';

// Utils:
import i18n from '../../utils/i18n';
import { stripHyphens } from '../../utils/utils';

// Data:
import data from '../../../data/index.json';

// Actions:
import { resetColorTheme } from '../../actions/ColorThemeActions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      cardData: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());

    const cardData = [];
    data.categories.forEach(category => {
      const pillText = stripHyphens(category.key);
      const pillBg = `bg-${category.colorKey}`;

      category.children.forEach(subcategory => {
        const title = subcategory.title;
        const description = subcategory.description;
        const urlKey = `/categories/${category.key}/${subcategory.key}`;

        cardData.push({ title, description, pillText, pillBg, urlKey });
      });
    });
    this.setState({ cardData });
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-jumbotron">
          <div className="main-page-jumbotron-text-container">
            <div className="main-page-jumbotron-title">
              Learn about algorithms and data structures.
            </div>
            <div className="main-page-jumbotron-subtitle">
              Algorithmica is an educational resource for learning about algorithms, data
              structures, and software engineering topics.
            </div>
          </div>
          <Particles />
        </div>
        <Container fluid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(MainPage);

// <JumbotronMain
// title={i18n.jumbotronMain.title[this.state.lang]}
// subtitle={i18n.jumbotronMain.subtitle[this.state.lang]}
// />
// <MainArea
// cardData={this.state.cardData}
// />
// <div className="container-main">
// </div>

// line_linked: {
//   shadow: {
//     enable: true,
//     color: "#3CA9D1",
//     blur: 0,
//   },
// },
// "move": {
//   "enable": true,
//   "speed": 12,
//   "direction": "none",
//   "random": false,
//   "straight": false,
//   "out_mode": "out",
//   "bounce": false,
//   "attract": {
//     "enable": false,
//     "rotateX": 600,
//     "rotateY": 1200
//   }
// },
