
/**
 * Parse HEX color string into RGB object.
 *
 * Supports 3-digit and 6-digit HEX formats.
 * The input must start with '#'.
 *
 * @param hex - HEX color string (e.g. "#fff", "#ffffff")
 *
 * @returns RGB object { r, g, b }
 *          Returns null if the input is not a valid HEX string.
 *
 * @example
 * parseHexToRgb("#fff")     // { r: 255, g: 255, b: 255 }
 * parseHexToRgb("#000000")  // { r: 0, g: 0, b: 0 }
 * parseHexToRgb("fff")      // null
 * parseHexToRgb("invalid")  // null
 */
export const parseHexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  if (!hex.startsWith('#')) return null;

  let cleaned = hex.slice(1);

  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleaned.length !== 6) return null;

  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);

  if ([r, g, b].some(Number.isNaN)) return null;

  return { r, g, b };
};

/**
 * Convert HEX color to RGB string.
 *
 * @param hex - HEX color string (e.g. "#fff", "#ffffff")
 *
 * @returns RGB string (e.g. "rgb(255, 255, 255)")
 *          Returns empty string ('') if hex parsing fails.
 *
 * @example
 * hexToRgb("#ffffff") // "rgb(255, 255, 255)"
 * hexToRgb("#000")    // "rgb(0, 0, 0)"
 * hexToRgb("invalid") // ""
 */
export const hexToRgb = (hex: string): string | '' => {
  const rgb = parseHexToRgb(hex);
  if (!rgb) return '';
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

/**
 * Convert HEX color to RGBA string.
 *
 * @param hex - HEX color string (e.g. "#fff", "#ffffff")
 * @param alpha - Opacity value. Any number is allowed, but will be clamped to [0, 1].
 *
 * @returns RGBA string (e.g. "rgba(227, 227, 227, 0.3)")
 *          Returns empty string ('') if hex parsing fails.
 *
 * @example
 * hexToRgba("#e3e3e3", 0.3)  // "rgba(227, 227, 227, 0.3)"
 * hexToRgba("#e3e3e3", 21)   // "rgba(227, 227, 227, 1)"
 * hexToRgba("#e3e3e3", -12)  // "rgba(227, 227, 227, 0)"
 */
export const hexToRgba = (hex: string, alpha: number): string | '' => {
  const rgb = parseHexToRgb(hex);
  if (!rgb) return '';
  
  const alphaValue = Math.min(1, Math.max(0, alpha));

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaValue})`;
};
