import { defaultDarkColors, defaultLightColors } from './constants'
import { generateTokenColor } from './generateTokenCss'
import { DefaultColorKey, RequiredColorTokens } from './tokens'

export const createColor = <
  const Themes extends {
    light: object;
    dark: Record<keyof Themes['light'], string>;
  } & {
    [K in Exclude<keyof Themes, 'light' | 'dark'>]: Partial<Record<keyof Themes['light'], string>>;
  },
>(themes: Themes) => {
  type ThemeName = Extract<keyof Themes, string>;
  type Extra = Exclude<keyof Themes['light'], RequiredColorTokens | DefaultColorKey>;
  type Keys = RequiredColorTokens | Extra | DefaultColorKey;

  const lightResolved = { ...defaultLightColors, ...themes.light };
  const darkResolved = { ...defaultDarkColors, ...themes.dark };

  const merged = {} as Record<ThemeName, Record<string, string>>;
  merged['light' as ThemeName] = lightResolved;
  merged['dark' as ThemeName] = darkResolved;

  for (const theme in themes) {
    if (!Object.prototype.hasOwnProperty.call(themes, theme)) continue;
    if (theme === 'light' || theme === 'dark') continue;

    const key = theme as ThemeName;
    merged[key] = { ...lightResolved, ...themes[key] };
  }

  if (typeof document !== 'undefined') {
    injectStyles(merged);
  }

  const themeNames: readonly ThemeName[] = Object.freeze(Object.keys(merged) as ThemeName[]);
  const listeners = new Set<(theme: ThemeName) => void>();

  const isTheme = (value: unknown): value is ThemeName =>
    typeof value === 'string' && Object.prototype.hasOwnProperty.call(merged, value);

  // Pick up a theme class applied before this runs (e.g. by an inline script in index.html).
  const detectInitialTheme = (): ThemeName => {
    if (typeof document === 'undefined') return 'light' as ThemeName;
    const root = document.documentElement;
    return themeNames.find((name) => name !== 'light' && root.classList.contains(name))
      ?? ('light' as ThemeName);
  };

  let currentTheme = detectInitialTheme();
  let current: Record<string, string> = merged[currentTheme];

  const getTheme = (): ThemeName => currentTheme;

  const setTheme = (theme: ThemeName) => {
    if (!isTheme(theme)) {
      console.warn(`[design-system] Unknown theme "${String(theme)}". Available: ${themeNames.join(', ')}`);
      return;
    }

    const changed = theme !== currentTheme;
    currentTheme = theme;
    current = merged[theme];

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      themeNames.forEach((name) => {
        root.classList.remove(name);
      });
      if (theme !== 'light') {
        root.classList.add(theme);
      }
    }

    if (changed) {
      listeners.forEach((listener) => listener(theme));
    }
  };

  const onThemeChange = (listener: (theme: ThemeName) => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const cssVar = new Proxy({} as Record<Keys, string>, {
    get: (_, key: string) => `var(--${key})`,
  });

  const colors = new Proxy({} as Record<Keys, string>, {
    get: (_, key: string) => current[key],
  });

  return { cssVar, colors, themes: themeNames, isTheme, getTheme, setTheme, onThemeChange };
};

const injectStyles = (
  merged: Record<string, Record<string, string>>
): void => {
  let css = '';
  for (const name in merged) {
    const selector = name === 'light' ? ':root' : `.${name}`;
    css += generateTokenColor(merged[name], selector);
  }
  // Native UI (scrollbars, form controls) follows the theme. Extra themes inherit `light` from :root.
  css += ':root {\n  color-scheme: light;\n}\n.dark {\n  color-scheme: dark;\n}\n';

  let style = document.querySelector<HTMLStyleElement>(
    'style[data-design-system="color"]',
  );
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('data-design-system', 'color');
    document.head.insertBefore(style, document.head.firstChild);
  }
  style.textContent = css;
};
