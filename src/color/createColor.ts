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

  let current: Record<string, string> = merged.light;

  const setTheme = (theme: ThemeName) => {
    current = merged[theme];
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      (Object.keys(merged) as ThemeName[]).forEach((name) => {
        root.classList.remove(name);
      });
      if (theme !== 'light') {
        root.classList.add(theme);
      }
    }
  };

  const cssVar = new Proxy({} as Record<Keys, string>, {
    get: (_, key: string) => `var(--${key})`,
  });

  const colors = new Proxy({} as Record<Keys, string>, {
    get: (_, key: string) => current[key],
  });

  return { cssVar, colors, setTheme };
};

const injectStyles = (
  merged: Record<string, Record<string, string>>
): void => {
  let css = '';
  for (const name in merged) {
    const selector = name === 'light' ? ':root' : `.${name}`;
    css += generateTokenColor(merged[name], selector);
  }

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