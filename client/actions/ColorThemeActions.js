export const setColorTheme = (colorKey = 'main') => ({
  type: 'SET_COLOR',
  colorKey
});

export const resetColorTheme = () => ({
  type: 'RESET_COLOR'
});
