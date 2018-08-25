import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Col, Container, Row } from 'reactstrap';

import { resetColorTheme } from 'actions/ColorThemeActions';

import DashboardPageBookmarkItem from './DashboardPageBookmarkItem';
import DashboardPageHeader from './DashboardPageHeader';
import DashboardPageProgressContainer from './DashboardProgressContainer';

const sampleBookmarkData = [
  {
    topicItemTitle: 'Introduction',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    type: 'article',
  },
  {
    topicItemTitle: 'Linked List',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    type: 'code',
  },
  {
    topicItemTitle: 'Stack',
    subcategoryTitle: 'Lists',
    categoryTitle: 'Data Structures',
    type: 'video',
  },
  {
    topicItemTitle: 'Introduction',
    subcategoryTitle: 'Sorting',
    categoryTitle: 'General Algorithms',
    type: 'article',
  },
  {
    topicItemTitle: 'Merge Sort',
    subcategoryTitle: 'Sorting',
    categoryTitle: 'General Algorithms',
    type: 'code',
  },
  {
    topicItemTitle: 'Quick Sort',
    subcategoryTitle: 'Sorting',
    categoryTitle: 'General Algorithms',
    type: 'video',
  },
];

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      uncompleted: 0,
      completed: 0,
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());

    // request current user

    this.setState({
      fullName: 'John Smith',
      uncompleted: 150,
      completed: 25,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="2" />
          <Col md="8">
            <div className="dashboard-page-container">
              <DashboardPageHeader
                fullName={this.state.fullName}
              />
              <DashboardPageProgressContainer
                uncompleted={this.state.uncompleted}
                completed={this.state.completed}
              />
            </div>
          </Col>
          <Col md="2" />
        </Row>

        <Row>
          <Col md="2" />
          <Col md="8">
            <div className="dashboard-page-bookmarks-container">
              <div className="dashboard-page-bookmarks-header">
                Daily Activity
              </div>
              <div className="dashboard-page-bookmarks-body">
                <CalendarHeatmap
                  className="dashboard-page-calendar-heatmap"
                  startDate={moment()}
                  endDate={moment().add(365, 'day')}
                  values={[
                    { date: '2016-01-01' },
                    { date: '2016-01-22' },
                    { date: '2016-01-30' },
                  ]}
                  classForValue={value => {
                    if (!value) {
                      return 'color-empty';
                    }

                    /* eslint-disable no-else-return */
                    if (!value.count || (value.count >= 0 && value.count <= 3)) {
                      return 'color-scale-1';
                    } else if (value.count <= 5) {
                      return 'color-scale-2';
                    } else if (value.count <= 7) {
                      return 'color-scale-3';
                    } else {
                      return 'color-scale-4';
                    }
                  }}
                />
              </div>
            </div>
          </Col>
          <Col md="2" />
        </Row>

        <Row>
          <Col md="2" />
          <Col md="8">
            <div className="dashboard-page-bookmarks-container">
              <div className="dashboard-page-bookmarks-header">
                Saved Bookmarks
              </div>
              <div className="dashboard-page-bookmarks-body">
                {
                  sampleBookmarkData.map((bookmark, i) => (
                    <DashboardPageBookmarkItem
                      key={i}
                      {...bookmark}
                    />
                  ))
                }
              </div>
            </div>
          </Col>
          <Col md="2" />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default compose(
  connect(mapStateToProps),
)(DashboardPage);
