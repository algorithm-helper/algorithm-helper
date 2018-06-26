import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components:
import NavBar from '../components/NavBar/';
import MainPage from '../components/MainPage/';
import LoginPage from '../components/LoginPage/';
import SignUpPage from '../components/SignUpPage/';
import DashboardPage from '../components/DashboardPage/';
import SearchPage from '../components/SearchPage/';
import ContentPage from '../components/ContentPage/';
import TopicItemPage from '../components/TopicItemPage/';

class AppRouter extends React.Component {
  constructor(props) {
  super(props);
  }

  /**
   * Renders the AppRouter router.
   */
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />

          <Switch>
            <Route
              path="/"
              component={MainPage}
              exact={true}
            />

            <Route
              path="/login"
              component={LoginPage}
              exact={true}
            />

            <Route
              path="/signup"
              component={SignUpPage}
              exact={true}
            />

            <Route
              path="/dashboard"
              component={DashboardPage}
              exact={true}
            />

            <Route
              path="/search"
              component={SearchPage}
              exact={true}
            />

            <Route
              path="/categories"
              component={ContentPage}
              exact={true}
            />

            <Route
              path="/categories/:categoryKey"
              component={ContentPage}
              exact={true}
            />

            <Route
              path="/categories/:categoryKey/:subcategoryKey"
              component={ContentPage}
              exact={true}
            />

            <Route
              path="/categories/:categoryKey/:subcategoryKey/:topicKey"
              component={TopicItemPage}
              exact={true}
            />

            <Route
              path="*"
              component={() => <Redirect to={'/'} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
