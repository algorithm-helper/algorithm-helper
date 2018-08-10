import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import JumbotronMedium from '../JumbotronMedium/';

import { resetColorTheme } from '../../actions/ColorThemeActions';
import settings from './settings.json';

class InformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleUrl: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());


  }

  render() {
    const { title } = settings[this.props.informationKey];

    return (
      <div>
        <JumbotronMedium
          title={title}
        />
      </div>
    );
  }
}

InformationPage.propTypes = {
  informationKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(InformationPage);
