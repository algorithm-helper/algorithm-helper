import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Col, Container, Row } from 'reactstrap';

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
  createData = (uncompleted, completed) => {
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
  };

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
      <Container fluid className="dashboard-page-progress-container">
        <Row>
          <Col md="6">
            <div className="dashboard-page-progress-left">
              <Doughnut
                data={this.createData(this.props.uncompleted, this.props.completed)}
                height={250}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="dashboard-page-progress-right">
              <div className="dashboard-page-progress-header">
                Your Progress
              </div>
              <div className="dashboard-page-progress-body">
                <div className="dashboard-page-progress-item">
                  <div style={{ float: 'left' }}>Completed</div>
                  <div style={{ float: 'right' }}>
                  { this.getPercentage(this.props.completed) }
                  </div>
                  <div style={{ clear: 'both' }}/>
                </div>
                <div className="dashboard-page-progress-item">
                  <div style={{ float: 'left' }}>Uncompleted</div>
                  <div style={{ float: 'right' }}>
                  { this.getPercentage(this.props.uncompleted) }
                  </div>
                  <div style={{ clear: 'both' }}/>
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
                        <MenuItem key={i} value={i}>
                          {category}
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
  uncompleted: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};

export default compose(
  withStyles(materialUIStyles),
)(DashboardProgressContainer);
