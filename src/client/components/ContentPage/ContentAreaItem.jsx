import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import getColorFromKey from 'utils/getColorFromKey';

import {
  contentAreaItem,
  contentAreaItemHeader,
  contentAreaItemHeaderTitle,
  contentAreaItemHeaderDescription,
  contentAreaItemChildren,
  contentAreaItemChildrenItem,
  contentAreaItemChildrenItemLink,
} from './styles.scss';

/**
 * Renders the ContentAreaItem stateless functional component.
 *
 * @param {object} props
 */
const ContentAreaItem = props => {
  const {
    itemKey,
    urlKey,
    colorKey,
    title,
    description,
    children,
    isTopicItem,
  } = props;

  return (
    <div id={itemKey} className={contentAreaItem}>
      <div className={contentAreaItemHeader}>
        <Link to={`${urlKey}`}>
          <div
            className={contentAreaItemHeaderTitle}
            style={{ color: getColorFromKey(colorKey) }}
          >
            {title}
          </div>
        </Link>

        <div className={contentAreaItemHeaderDescription}>
          {description}
        </div>
      </div>
      <div className={contentAreaItemChildren}>
        {
          children
          && children.map((item, i) => (
            <div className={contentAreaItemChildrenItem} key={i}>
              <div className={contentAreaItemChildrenItemLink}>
                <Link
                  to={isTopicItem
                    ? `${props.urlKey}?item=${i}`
                    : `${props.urlKey}/${item.key}`
                  }
                  style={{ color: getColorFromKey(props.colorKey) }}
                >
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
};

ContentAreaItem.propTypes = {
  children: PropTypes.array,
  description: PropTypes.string,
  itemKey: PropTypes.string,
  title: PropTypes.string,
  urlKey: PropTypes.string,
  isTopicItem: PropTypes.bool,
  colorKey: PropTypes.number,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(ContentAreaItem);
