import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { resetColorTheme } from 'actions/ColorThemeActions';

import DashboardHeader from './DashboardHeader';
import DashboardPageProgressContainer from './DashboardProgressContainer';
import DashboardCalendarHeatmapContainer from './DashboardCalendarHeatmapContainer';
import DashboardBookmarkContainer from './DashboardBookmarkContainer';

import { dashboardPageContainer } from './styles.scss';

const sampleBookmarkData = [
  // {
  //   topicItemTitle: 'Introduction',
  //   subcategoryTitle: 'Lists',
  //   categoryTitle: 'Data Structures',
  //   type: 'article',
  // },
  // {
  //   topicItemTitle: 'Linked List',
  //   subcategoryTitle: 'Lists',
  //   categoryTitle: 'Data Structures',
  //   type: 'code',
  // },
  // {
  //   topicItemTitle: 'Stack',
  //   subcategoryTitle: 'Lists',
  //   categoryTitle: 'Data Structures',
  //   type: 'video',
  // },
  // {
  //   topicItemTitle: 'Introduction',
  //   subcategoryTitle: 'Sorting',
  //   categoryTitle: 'General Algorithms',
  //   type: 'article',
  // },
  // {
  //   topicItemTitle: 'Merge Sort',
  //   subcategoryTitle: 'Sorting',
  //   categoryTitle: 'General Algorithms',
  //   type: 'code',
  // },
  // {
  //   topicItemTitle: 'Quick Sort',
  //   subcategoryTitle: 'Sorting',
  //   categoryTitle: 'General Algorithms',
  //   type: 'video',
  // },
];

const sampleActivityItems = [
  // { date: '2016-01-01' },
  // { date: '2016-01-22' },
  // { date: '2018-09-30' },
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

    if (!this.props.userAccount || !this.props.userAccount.isLoggedIn) {
      return;
    }

    // Request the current user
    fetch('/accounts/user-data', {
      method: 'POST',
      headers: {
        'X-Auth': this.props.userAccount.authToken,
      },
    })
      .then(result => result.json())
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });

    // Request the total number of items
    fetch('/data/utils/topic-item-count', {
      method: 'GET',
    })
      .then(result => result.json())
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.props.userAccount.isLoggedIn) {
      return <Redirect to="/login" />;
    }

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
              activityItems={sampleActivityItems}
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
  userAccount: state.userAccount,
});

export default connect(mapStateToProps)(DashboardPage);
