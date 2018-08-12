import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import getColorFromKey from '../../utils/getColorFromKey';

class TopicItemNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelected: 0,
    };
  }

  componentWillMount() {
    this.setState({ indexSelected: this.props.indexStart });
  }

  handleClick = index => {
    this.setState({ indexSelected: index });
  }

  /**
   * Renders the TopicItemNavBar component.
   */
  render() {
    const topicItemsTest = ['Article', 'Code'];

    return (
      <Container fluid>
        <Row>
          <div className="topic-item-navbar-container">
            <ul className="nav justify-content-center grey lighten-4 navbar-topic">
              {
                topicItemsTest &&
                topicItemsTest.map((item, i) => {
                  const activeClass = i === this.state.indexSelected
                    ? 'topic-item-navbar-item-active'
                    : '';

                  return (
                    <li
                      key={i}
                      className={`nav-item ${activeClass}`}
                      style={{ color: getColorFromKey(this.props.colorKey) }}>
                      <div className="topic-item-navbar-item">
                        <a onClick={() => {
                          this.handleClick(i);
                          this.props.handleChangeIndex(i);
                        }}>{item}</a>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemNavBar);
