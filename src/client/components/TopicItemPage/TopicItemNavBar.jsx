import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';

import getColorFromKey from 'utils/getColorFromKey';

import {
  topicItemNavbarContainer,
  topicItemNavbarItem,
  topicItemNavbarItemActive,
} from './styles.scss';

class TopicItemNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelected: 0,
      topicItemTypes: [],
    };
  }

  componentWillMount() {
    this.setState({
      indexSelected: this.props.indexStart,
      topicItemTypes: this.props.topicItemTypes,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      indexSelected: newProps.indexStart,
      topicItemTypes: newProps.topicItemTypes,
    });
  }

  /**
   * Handles when an item in the navbar is clicked by changing the index.
   */
  handleClick = index => {
    this.setState({ indexSelected: index });
  }

  /**
   * Renders the TopicItemNavBar component.
   */
  render() {
    return (
      <Container fluid>
        <Row>
          <div className={topicItemNavbarContainer}>
            <ul className="nav justify-content-center grey lighten-4 navbar-topic">
              {
                this.state.topicItemTypes
                && (
                  this.state.topicItemTypes.map((item, i) => {
                    const activeClass = i === this.state.indexSelected
                      ? topicItemNavbarItemActive
                      : '';

                    return (
                      <li
                        key={i}
                        className={classnames('nav-item', activeClass)}
                        style={{ color: getColorFromKey(this.props.colorKey) }}
                      >
                        <div className={topicItemNavbarItem}>
                          <a onClick={() => {
                            this.handleClick(i);
                            this.props.handleChangeIndex(i);
                          }}
                          >
                            {item.title}
                          </a>
                        </div>
                      </li>
                    );
                  })
                )
              }
            </ul>
          </div>
        </Row>
      </Container>
    );
  }
}

TopicItemNavBar.propTypes = {
  indexStart: PropTypes.number,
  topicItemTypes: PropTypes.array,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(TopicItemNavBar);
