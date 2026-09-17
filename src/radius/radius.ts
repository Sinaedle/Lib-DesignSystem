// Must stay in sync with the radius variables in src/styles/tokens.css
export const RADIUS_TOKENS = ['4xs', '3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl'] as const;

export type RadiusToken = typeof RADIUS_TOKENS[number];

/**
 * CSS variable references for radius tokens.
 * Requires `@sinaedle/design-system/tokens.css` to be imported.
 *
 * @example
 * radius.m  // 'var(--radius-m)'
 */
export const radius = Object.freeze(
  Object.fromEntries(RADIUS_TOKENS.map((token) => [token, `var(--radius-${token})`])),
) as Readonly<Record<RadiusToken, string>>;
