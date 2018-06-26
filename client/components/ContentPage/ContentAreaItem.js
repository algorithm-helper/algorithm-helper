import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ContentAreaItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.itemKey} className="categories-item">
        <div className="categories-item-header">
          <Link to={`${this.props.urlKey}`}>
            <div className={`categories-item-header-icon ${this.props.bgName}`}></div>
            <div className={`categories-item-header-title ${this.props.colorName}`}>
              {this.props.title} &rsaquo;
            </div>
          </Link>

          <div className="categories-item-header-description">
            {this.props.description}
          </div>
        </div>
        <div className="categories-item-subcategories">
          {
            this.props.children &&
            this.props.children.map((item, i) => (
              <div className="categories-item-subcategories-item" key={i}>
                <div className={`categories-item-subcategories-item-link ${this.props.colorName}`}>
                  <Link to={
                    this.props.isTopicItem ?
                    `${this.props.urlKey}?item=${i}` :
                    `${this.props.urlKey}/${item.key}`
                  }>
                    <i className="fa fa-star"></i>
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
}

ContentAreaItem.propTypes = {
  bgName: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  colorName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  urlKey: PropTypes.string.isRequired,
};
