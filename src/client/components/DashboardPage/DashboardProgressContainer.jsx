import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { Col, Container, Row } from 'reactstrap';

import {
  dashboardProgressContainer,
  dashboardProgressHeader,
  dashboardProgressBody,
  dashboardProgressItem,
} from './styles.scss';

const materialUIStyles = theme => ({
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

// TODO: fetch this list from server
const categories = [
  {
    title: 'Data Structures',
    key: 'data-structures',
  },
  {
    title: 'General Algorithms',
    key: 'general-algorithms',
  },
  {
    title: 'Strings',
    key: 'strings',
  },
  {
    title: 'Graphs',
    key: 'graphs',
  },
  {
    title: 'Randomization',
    key: 'randomization',
  },
  {
    title: 'Mathematics',
    key: 'mathematics',
  },
  {
    title: 'Dynamic Programming',
    key: 'dynamic-programming',
  },
  {
    title: 'Algorithmic Analysis',
    key: 'algorithmic-analysis',
  },
  {
    title: 'Software Engineering',
    key: 'software-engineering',
  },
];

class DashboardProgressContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  /**
   * Returns the percentage given number.
   *
   * @param {number} num
   */
  getPercentage = num => {
    const total = this.props.uncompleted + this.props.completed;
    if (total === 0) {
      return '0%';
    }
    return `${Math.round((num / total) * 100)}%`;
  }

  /**
   * Creates the data for the Chart.js Doughnut chart.
   *
   * @param {number} uncompleted
   * @param {number} completed
   */
  createData = (uncompleted, completed) => ({
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
      ],
    }],
  });

  /**
   * Handles changes to the Select component.
   */
  handleChange = evt => {
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  /**
   * Renders the DashboardProgressContainer component.
   */
  render() {
    const { classes } = this.props;

    return (
      <Container className={dashboardProgressContainer} fluid>
        <Row>
          <Col md="6" sm="6" xs="6">
            <Doughnut
              data={this.createData(this.props.uncompleted, this.props.completed)}
              height={250}
            />
          </Col>
          <Col md="6" sm="6" xs="6">
            <div>
              <div className={dashboardProgressHeader}>
                Your Progress
              </div>
              <div className={dashboardProgressBody}>
                <div className={dashboardProgressItem}>
                  <div style={{ float: 'left' }}>Completed</div>
                  <div style={{ float: 'right' }}>
                    { this.getPercentage(this.props.completed) }
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>
                <div className={dashboardProgressItem}>
                  <div style={{ float: 'left' }}>Uncompleted</div>
                  <div style={{ float: 'right' }}>
                    { this.getPercentage(this.props.uncompleted) }
                  </div>
                  <div style={{ clear: 'both' }} />
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
                      categories.map((category, i) => (
                        <MenuItem key={i} value={category.key}>
                          {category.title}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

DashboardProgressContainer.propTypes = {
  uncompleted: PropTypes.number,
  completed: PropTypes.number,
};

export default compose(
  withStyles(materialUIStyles),
)(DashboardProgressContainer);
