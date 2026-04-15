import { generateTokenCss } from './generateTokenCss';
import type { RequiredTypoTokens, TypoMap, TypoSpec } from './tokens';

const injectedTokens = new Set<string>();

export function createTypography<Extra extends string = never>(
  map: TypoMap<Extra>,
): Record<RequiredTypoTokens | Extra, string> {
  if (typeof document !== 'undefined') {
    injectStyles(map);
  }

  const result = {} as Record<RequiredTypoTokens | Extra, string>;
  for (const key in map) {
    result[key as RequiredTypoTokens | Extra] = `typo-${key}`;
  }
  return result;
}

function injectStyles(map: Record<string, TypoSpec>): void {
  const newMap: Record<string, TypoSpec> = {};
  let hasNew = false;
  for (const key in map) {
    const spec = map[key];
    const id = `${key}:${JSON.stringify(spec)}`;
    if (!injectedTokens.has(id)) {
      injectedTokens.add(id);
      newMap[key] = spec;
      hasNew = true;
    }
  }
  if (!hasNew) return;

  const css = generateTokenCss(newMap);
  let style = document.querySelector<HTMLStyleElement>(
    'style[data-design-system="typography"]',
  );
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('data-design-system', 'typography');
    document.head.insertBefore(style, document.head.firstChild);
  }
  style.appendChild(document.createTextNode(css));
}