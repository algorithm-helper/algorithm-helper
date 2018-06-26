const LanguageReducerDefaultState = 'en';

export default (state = LanguageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return action.lang;
    case 'RESET_LANG':
      return 'en';
    default:
      return state;
  }
};
