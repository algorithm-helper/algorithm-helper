import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from 'routers/AppRouter';
import configureStore from 'store/configureStore';
import 'styles/base/base.scss';

const store = configureStore();
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// Check if localStorage contains a valid token, then store it into Redux
// localStorage['AlgorithmHelper.authToken']
console.log(store.getState());

store.subscribe(() => {
  // console.log('action', store.getState());
});

ReactDOM.render(App, document.getElementById('react-root'));
