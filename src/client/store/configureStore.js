import { createStore, combineReducers } from 'redux';
import { ColorThemeReducer } from 'reducers';

export default () => {
  const store = createStore(combineReducers({
    colorKey: ColorThemeReducer,
  }));
  return store;
};
