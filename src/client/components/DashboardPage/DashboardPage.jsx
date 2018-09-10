import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import { resetColorTheme } from 'actions/ColorThemeActions';

import DashboardHeader from './DashboardHeader';
import DashboardPageProgressContainer from './DashboardProgressContainer';
import DashboardCalendarHeatmapContainer from './DashboardCalendarHeatmapContainer';
import DashboardBookmarkContainer from './DashboardBookmarkContainer';

import { dashboardPageContainer } from './styles.scss';

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
      <Container className={dashboardPageContainer} fluid>
        <Row>
          <Col md="2" />
          <Col md="8">
            <DashboardHeader
              fullName={this.state.fullName}
            />

            <DashboardPageProgressContainer
              uncompleted={this.state.uncompleted}
              completed={this.state.completed}
            />

            <DashboardCalendarHeatmapContainer
              activityItems={
                [
                  { date: '2016-01-01' },
                  { date: '2016-01-22' },
                  { date: '2018-09-30' },
                ]
              }
              title="Daily Activity"
            />

            <DashboardBookmarkContainer
              bookmarkItems={sampleBookmarkData}
              title="Saved Bookmarks"
            />
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

export default connect(mapStateToProps)(DashboardPage);
