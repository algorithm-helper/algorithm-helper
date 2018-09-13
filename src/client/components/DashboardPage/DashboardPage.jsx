import React from 'react';
import MDSpinner from 'react-md-spinner';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { resetColorTheme } from 'actions/ColorThemeActions';
import getColorFromKey from 'utils/getColorFromKey';

import DashboardHeader from './DashboardHeader';
import DashboardPageProgressContainer from './DashboardProgressContainer';
import DashboardCalendarHeatmapContainer from './DashboardCalendarHeatmapContainer';
import DashboardBookmarkContainer from './DashboardBookmarkContainer';

import { dashboardPageContainer, dashboardSpinner } from './styles.scss';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      uncompleted: 0,
      completed: 0,
      loading: true,
      bookmarkData: [],
      activityItems: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());
    this.requestUserData();
  }

  /**
   * Makes a request to the server to get the current user's data as well as the total number of
   * TopicItems.
   */
  requestUserData = () => {
    if (!this.props.userAccount || !this.props.userAccount.isLoggedIn) {
      return;
    }

    Promise.all([
      fetch('/accounts/user-data', {
        method: 'POST',
        headers: {
          'X-Auth': this.props.userAccount.authToken,
        },
      }),
      fetch('/data/utils/topic-item-count', {
        method: 'GET',
      }),
    ])
      .then(result => Promise.all(result.map(x => x.json())))
      .then(result => {
        const [userData, topicItemCountMapping] = result.map(elem => elem.data);

        const { bookmarks, fullName, completedItems } = userData;
        const bookmarkData = this.getBookmarkData(bookmarks);
        const activityItems = this.getActivityItems(bookmarks, completedItems);

        console.log(topicItemCountMapping);
        console.log(completedItems);

        this.setState({
          loading: false,
          fullName,
          bookmarkData,
          activityItems,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * Creates the activity item array for the calendar heat map.
   *
   * @param {array} bookmarks
   * @param {array} completedItems
   */
  getActivityItems = (bookmarks, completedItems) => {
    const result = []
      .concat(
        bookmarks.map(elem => elem.dateAdded),
        completedItems.map(elem => elem.dateAdded),
      )
      .map(timestamp => moment(timestamp).format('YYYY-MM-DD'))
      .reduce((prev, curr) => ({
        ...prev,
        [curr]: (prev[curr] || 0) + 1,
      }), {});

    return Object.keys(result).map(key => ({
      date: key,
      count: result[key],
    }));
  };

  /**
   * Gets the correctly formatted bookmark data for the bookmark container.
   *
   * @param {array} bookmarks
   */
  getBookmarkData = bookmarks => (
    bookmarks.map(({
      key,
      categoryTitle,
      subcategoryTitle,
      topicTitle,
    }) => ({
      url: `/categories/${key}`,
      categoryTitle,
      subcategoryTitle,
      topicTitle,
    }))
  );

  render() {
    if (!this.props.userAccount.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <Container className={dashboardPageContainer} fluid>
        <Row>
          <Col md="2" />
          <Col md="8">
            {
              this.state.loading
                ? (
                  <div className={dashboardSpinner}>
                    <MDSpinner
                      size={50}
                      singleColor={getColorFromKey(this.props.colorKey)}
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    <DashboardHeader
                      fullName={this.state.fullName}
                    />

                    <DashboardPageProgressContainer
                      uncompleted={this.state.uncompleted}
                      completed={this.state.completed}
                      topicItemCountMapping={this.state.topicItemCountMapping}
                    />

                    <DashboardCalendarHeatmapContainer
                      activityItems={this.state.activityItems}
                      title="Daily Activity"
                    />

                    <DashboardBookmarkContainer
                      bookmarkItems={this.state.bookmarkData}
                      title="Saved Bookmarks"
                    />
                  </React.Fragment>
                )
            }
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
