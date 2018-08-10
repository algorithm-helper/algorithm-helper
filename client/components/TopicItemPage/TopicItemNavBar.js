import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  render() {
    const topicItemsTest = ['Article', 'Code'];
    const colorName = `color-${this.props.colorKey}`;

    return (
      <div className="row">
        <div className="navbar-topic-container">
          <ul className="nav justify-content-center grey lighten-4 navbar-topic">
            {
              topicItemsTest &&
              topicItemsTest.map((item, i) => {
                return (
                  <li key={i} className={`nav-item ${i === this.state.indexSelected ?
                    `navbar-topic-item-active ${colorName}` : ''}`}>
                    <div className="navbar-topic-item">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemNavBar);
