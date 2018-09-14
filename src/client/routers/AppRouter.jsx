import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import NavBar from 'components/NavBar';
import MainPage from 'components/MainPage';
import LoginPage from 'components/LoginPage';
import SignUpPage from 'components/SignUpPage';
import DashboardPage from 'components/DashboardPage';
import SearchPage from 'components/SearchPage';
import ContentPage from 'components/ContentPage';
import TopicItemPage from 'components/TopicItemPage';
import InformationPage from 'components/InformationPage';

/**
 * Renders the AppRouter stateless functional component.
 */
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <NavBar />

      <Switch>
        <Route
          path="/"
          component={MainPage}
          exact
        />

        <Route
          path="/login"
          component={LoginPage}
          exact
        />

        <Route
          path="/signup"
          component={SignUpPage}
          exact
        />

        <Route
          path="/about"
          component={props => <InformationPage {...props} informationKey="about" />}
          exact
        />

        <Route
          path="/terms-and-conditions"
          component={props => <InformationPage {...props} informationKey="terms-and-conditions" />}
          exact
        />

        <Route
          path="/privacy-policy"
          component={props => <InformationPage {...props} informationKey="privacy-policy" />}
          exact
        />

        <Route
          path="/dashboard"
          component={DashboardPage}
          exact
        />

        <Route
          path="/search"
          component={SearchPage}
          exact
        />

        <Route
          path="/categories"
          component={ContentPage}
          exact
        />

        <Route
          path="/categories/:categoryKey"
          component={ContentPage}
          exact
        />

        <Route
          path="/categories/:categoryKey/:subcategoryKey"
          component={ContentPage}
          exact
        />

        <Route
          path="/categories/:categoryKey/:subcategoryKey/:topicKey"
          component={TopicItemPage}
          exact
        />

        <Route
          path="*"
          component={() => <Redirect to="/" />}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
