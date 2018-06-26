import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Renders the JumbotronSmall stateless functional component.
 *
 * @param {object} props
 */
const JumbotronSmall = props => (
  <div className={`row jumbotron-sm bg-${props.colorKey}`}>
    <div className="col-md-12">
      <div className="jumbotron-sm-text-container">
        <div className="jumbotron-sm-title">{props.title}</div>
        <div className="jumbotron-sm-subtitle">
          <Link to={props.urlKey}>
            &lsaquo; {props.subtitle}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

JumbotronSmall.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  urlKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(JumbotronSmall);
