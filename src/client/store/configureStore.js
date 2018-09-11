import { createStore, combineReducers } from 'redux';
import { AccountReducer, ColorThemeReducer } from 'reducers';

export default () => {
  const store = createStore(combineReducers({
    userAccount: AccountReducer,
    colorKey: ColorThemeReducer,
  }));
  return store;
};
