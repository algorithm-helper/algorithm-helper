import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      shouldRedirect: false,
    };
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchQuery(e) {
    const searchQuery = e.target.value.trim();
    if (!searchQuery) {
      return;
    }
    this.setState({ searchQuery });
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.searchQuery) {
      this.setState({ shouldRedirect: true });
    }
  }

  render() {
    if (this.state.shouldRedirect) {
      // this.props.history.push('/search');
    }

    const bgClass = this.props.colorKey !== undefined ? `bg-${this.props.colorKey}` : 'bg-main';

    return (
      <nav className={`navbar navbar-expand-md fixed-top navbar-dark navbar-main ${bgClass}`}>
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link id="btn-explore" className="nav-link" to={'/categories'}>Explore</Link>
            </li>
            <li className="nav-item">
              <form
                id="form-search"
                className="form-inline"
                onSubmit={this.handleSearch}
                >
                <div className="md-form my-0">
                  <input
                    id="search"
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    autoComplete="off"
                    onChange={this.handleSearchQuery}
                  />
                </div>
              </form>
            </li>
          </ul>
        </div>

        <div className="mx-auto order-0">
          <Link className="navbar-brand mx-auto navbar-title" to={'/'}>Algorithm Helper</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={'/login'}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbar-btn-outline navbar-btn-signup"
                to={'/signup'}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavBar);
