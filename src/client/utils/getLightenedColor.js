import Color from 'color';

/**
 * Returns a lighter version of the current color theme as a HEX string.
 *
 * @param {string} currentColor
 */
const getLightenedColor = currentColor => Color(currentColor).lighten(0.15).hex();

export default getLightenedColor;
