
const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

const clampAlpha = (alpha: number): number => Math.min(1, Math.max(0, alpha));

/**
 * Parse HEX color string into RGB object.
 *
 * Supports 3, 4, 6 and 8-digit HEX formats.
 * The input must start with '#'.
 *
 * @param hex - HEX color string (e.g. "#fff", "#ffffff", "#ffffff80")
 *
 * @returns RGB object { r, g, b, a } (a is in [0, 1], 1 when the input has no alpha)
 *          Returns null if the input is not a valid HEX string.
 *
 * @example
 * parseHexToRgb("#fff")       // { r: 255, g: 255, b: 255, a: 1 }
 * parseHexToRgb("#00000080")  // { r: 0, g: 0, b: 0, a: 0.502 }
 * parseHexToRgb("fff")        // null
 * parseHexToRgb("#1g2233")    // null
 */
export const parseHexToRgb = (
  hex: string
): { r: number; g: number; b: number; a: number } | null => {
  if (!HEX_PATTERN.test(hex)) return null;

  let cleaned = hex.slice(1);

  if (cleaned.length === 3 || cleaned.length === 4) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  const a = cleaned.length === 8
    ? Math.round((parseInt(cleaned.substring(6, 8), 16) / 255) * 1000) / 1000
    : 1;

  return { r, g, b, a };
};

/**
 * Convert HEX color to RGB string.
 * Alpha in 4/8-digit input is ignored.
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
 * The `alpha` argument replaces any alpha in 4/8-digit input.
 *
 * The result is a fixed value — it does not follow theme changes.
 * Use `withAlpha(cssVar.xxx, alpha)` for theme-aware colors.
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

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampAlpha(alpha)})`;
};

/**
 * Apply opacity to any CSS color, including CSS variables.
 *
 * Resolved by the browser via `color-mix`, so `withAlpha(cssVar.main50, 0.3)`
 * follows theme changes automatically.
 *
 * @param color - Any CSS color (e.g. "var(--main50)", "#3CAAAE", "red")
 * @param alpha - Opacity value. Any number is allowed, but will be clamped to [0, 1].
 *
 * @returns `color-mix()` string
 *
 * @example
 * withAlpha("var(--main50)", 0.3)  // "color-mix(in srgb, var(--main50) 30%, transparent)"
 * withAlpha("#000", 2)             // "color-mix(in srgb, #000 100%, transparent)"
 */
export const withAlpha = (color: string, alpha: number): string => {
  const percent = Math.round(clampAlpha(alpha) * 1000) / 10;
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
};
