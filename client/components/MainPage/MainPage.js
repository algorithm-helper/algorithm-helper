import React from 'react';
import { connect } from 'react-redux';

// Components:
import NavBar from '../NavBar/';
import JumbotronMain from '../JumbotronMain/';
import MainArea from './MainArea';

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
      <div className="container-main">
        <JumbotronMain
          title={i18n.jumbotronMain.title[this.state.lang]}
          subtitle={i18n.jumbotronMain.subtitle[this.state.lang]}
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
