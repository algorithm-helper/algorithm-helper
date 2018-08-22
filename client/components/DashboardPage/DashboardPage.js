import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Col, Container, Row } from 'reactstrap';

import DashboardPageBookmarkItem from './DashboardPageBookmarkItem';

import { resetColorTheme } from '../../actions/ColorThemeActions';

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

function createData({ uncompleted, completed }) {
  return {
    labels: [
      'Uncompleted',
      'Completed',
    ],
    datasets: [{
      data: [uncompleted, completed],
      backgroundColor: [
        '#BDBDBD',
        '#66BB6A',
      ],
      hoverBackgroundColor: [
        '#BDBDBD',
        '#66BB6A',
      ]
    }],
  };
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      uncompleted: 0,
      completed: 0,
      selected: '',
    };

    this.getPercentage = this.getPercentage.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(resetColorTheme());

    this.setState({
      fullName: 'John Smith',
      uncompleted: 150,
      completed: 25,
    });

    this.handleChange = this.handleChange.bind(this);

    this.categories = [
      'Data Structures',
      'General Algorithms',
      'Strings',
      'Graphs',
      'Randomization',
      'Mathematics',
      'Dynamic Programming',
      'Algorithmic Analysis',
      'Software Engineering',
    ];
  }

  getPercentage(num) {
    const total = this.state.uncompleted + this.state.completed;
    if (total === 0) {
      return '0%';
    }
    return `${Math.round((num / total) * 100)}%`;
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col md="2"/>
          <Col md="8">
            <div className="dashboard-page-container">
              <div className="dashboard-page-header">
                Welcome back, {this.state.fullName}.
              </div>
              <div className="dashboard-page-progress-container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="dashboard-page-progress-left">
                      <Doughnut
                        data={createData({
                          uncompleted: this.state.uncompleted,
                          completed: this.state.completed,
                        })}
                        height={250}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dashboard-page-progress-right">
                      <div className="dashboard-page-progress-header">
                        Your Progress
                      </div>
                      <div className="dashboard-page-progress-body">
                        <div className="dashboard-page-progress-item">
                          <div style={{ float: 'left' }}>Completed</div>
                          <div style={{ float: 'right' }}>
                          { this.getPercentage(this.state.completed) }
                          </div>
                          <div style={{ clear: 'both' }}></div>
                        </div>
                        <div className="dashboard-page-progress-item">
                          <div style={{ float: 'left' }}>Uncompleted</div>
                          <div style={{ float: 'right' }}>
                          { this.getPercentage(this.state.uncompleted) }
                          </div>
                          <div style={{ clear: 'both' }}></div>
                        </div>

                        <FormControl className={classes.formControl}>
                          <Select
                            value={this.state.selected}
                            onChange={this.handleChange}
                            name="selected"
                            displayEmpty
                            className={classes.selectEmpty}
                          >
                            <MenuItem value="">
                              <em>All</em>
                            </MenuItem>
                            {
                              this.categories.map((category, i) => (
                                <MenuItem key={i} value={i}>
                                  {category}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="2"/>
        </Row>
        <Row>
          <Col md="2"/>
          <Col md="8">
            <div className="dashboard-page-bookmarks-container">
              <div className="dashboard-page-bookmarks-header">
                Your Saved Bookmarks
              </div>
              <div className="dashboard-page-bookmarks-body">
              {
                sampleBookmarkData.map((bookmark, i) => {
                  return (
                    <DashboardPageBookmarkItem
                      key={i}
                      {...bookmark}
                    />
                  );
                })
              }
              </div>
            </div>
          </Col>
          <Col md="2"/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(DashboardPage);
