export const setColorTheme = (colorKey = 0) => ({
  type: 'SET_COLOR',
  colorKey,
});

export const resetColorTheme = () => ({
  type: 'RESET_COLOR',
});
