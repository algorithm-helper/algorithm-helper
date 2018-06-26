import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Renders the JumbotronMedium stateless functional component.
 *
 * @param {object} props
 */
const JumbotronMedium = props => {
  const bgClass = props.colorKey !== undefined ? `bg-${props.colorKey}` : 'bg-main';

  return (
    <div className="container-fluid">
      <div className={`row jumbotron-md ${bgClass}`}>
        <div className="col-md-12">
          <div className="jumbotron-md-text-container">
            <div className="jumbotron-md-title">{props.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

JumbotronMedium.propTypes = {
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(JumbotronMedium);
