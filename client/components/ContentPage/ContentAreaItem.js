import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import getColorFromKey from '../../utils/getColorFromKey';

/**
 * Renders the ContentAreaItem stateless functional component.
 *
 * @param {object} props
 */
const ContentAreaItem = props => {

  return (
    <div id={props.itemKey} className="content-area-item">
      <div className="content-area-item-header">
        <Link to={`${props.urlKey}`}>
          <div
            className="content-area-item-header-icon"
            style={{ backgroundColor: getColorFromKey(props.colorKey) }}
          />
          <div
            className="content-area-item-header-title"
            style={{ color: getColorFromKey(props.colorKey) }}>
            {props.title}
          </div>
        </Link>

        <div className="content-area-item-header-description">
          {props.description}
        </div>
      </div>
      <div className="content-area-item-children">
        {
          props.children &&
          props.children.map((item, i) => (
            <div className="content-area-item-children-area-item" key={i}>
              <div className="content-area-item-children-area-item-link">
                <Link
                  to={ props.isTopicItem
                    ? `${props.urlKey}?item=${i}`
                    : `${props.urlKey}/${item.key}`
                    }
                  style={{ color: getColorFromKey(props.colorKey) }}>
                  <i className="fa fa-star" />
                  <span>{item.title}</span>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

ContentAreaItem.propTypes = {
  children: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  urlKey: PropTypes.string.isRequired,
  isTopicItem: PropTypes.bool,
};


const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(ContentAreaItem);
