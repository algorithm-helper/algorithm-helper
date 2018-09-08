import React from 'react';
import PropTypes from 'prop-types';

import Particles from './Particles';
import {
  mainPageJumbotron,
  mainPageJumbotronTextContainer,
  mainPageJumbotronTitle,
  mainPageJumbotronSubtitle,
} from './styles.scss';

/**
 * Renders the MainPageJumbotron stateless functional component.
 *
 * @param {object} props
 */
const MainPageJumbotron = props => (
  <div className={mainPageJumbotron}>
    <div className={mainPageJumbotronTextContainer}>
      <div className={mainPageJumbotronTitle}>
        {props.title}
      </div>
      <div className={mainPageJumbotronSubtitle}>
        {props.subtitle}
      </div>
    </div>
    <Particles />
  </div>
);

MainPageJumbotron.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default MainPageJumbotron;
