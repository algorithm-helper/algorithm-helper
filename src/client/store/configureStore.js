import { createStore, combineReducers } from 'redux';
import {
  AccountReducer,
  ColorThemeReducer,
  SearchReducer,
} from 'reducers';

export default () => {
  const store = createStore(combineReducers({
    userAccount: AccountReducer,
    colorKey: ColorThemeReducer,
    searchQuery: SearchReducer,
  }));
  return store;
};
