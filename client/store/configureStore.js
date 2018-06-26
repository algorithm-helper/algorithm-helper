import { createStore, combineReducers } from 'redux';
import ColorThemeReducer from '../reducers/ColorThemeReducer';

export default () => {
  const store = createStore(combineReducers({
    colorKey: ColorThemeReducer,
  }));
  return store;
};
