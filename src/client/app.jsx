import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from 'routers/AppRouter';
import configureStore from 'store/configureStore';
// import 'styles/styles.scss';

const store = configureStore();
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// For debugging:
store.subscribe(() => {
  // console.log('action', store.getState());
});

ReactDOM.render(App, document.getElementById('app'));
