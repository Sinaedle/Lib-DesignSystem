## @sinaedle/design-system

Typography and color token system for Sinaedle projects.

## Install

Install from a release tag. See [Tags](https://github.com/Sinaedle/Lib-DesignSystem/tags) for available versions.

```bash
npm install github:Sinaedle/Lib-DesignSystem#<tag>
```

To upgrade, run the same command with a newer tag.

## Quick Start

```ts
// Static tokens (radius, ...)
import '@sinaedle/design-system/tokens.css';

// Font (registers Pretendard + sets it as default font-family)
import '@sinaedle/design-system/pretendard.css';

// Runtime tokens
import { createTypography, createColor } from '@sinaedle/design-system';

export const typo = createTypography({ ... });
export const { cssVar, colors, themes, isTheme, getTheme, setTheme, onThemeChange } = createColor({ ... });
```

## Typography

Token-based typography. Map semantic tokens to typographic primitives — only the tokens you map get injected as styles.

### Setup

```ts
import { createTypography } from '@sinaedle/design-system';
import type { RequiredTypoTokens, TypoMap } from '@sinaedle/design-system';

export const TYPO_MAP = {
  display1: { primitive: '72-ExtraBold' },
  display2: { primitive: '64-ExtraBold' },
  display3: { primitive: '56-ExtraBold' },
  title1: { primitive: '48-Bold' },
  title2: { primitive: '40-Bold' },
  title3: { primitive: '32-Bold' },
  heading1: { primitive: '28-Bold' },
  heading2: { primitive: '26-Bold' },
  heading3: { primitive: '24-Bold' },
  body1: { primitive: '18-Medium' },
  body2: { primitive: '16-Medium' },
  body3: { primitive: '14-Medium' },
  bodyReading1: { primitive: '16-Medium', lineHeight: '170%' },
  bodyReading2: { primitive: '16-Regular', lineHeight: '170%' },
  bodyReading3: { primitive: '14-Medium', lineHeight: '170%' },
  label1: { primitive: '15-SemiBold' },
  label2: { primitive: '14-SemiBold' },
  label3: { primitive: '13-SemiBold' },
  caption1: { primitive: '12-SemiBold' },
  caption2: { primitive: '12-Regular' },
  caption3: { primitive: '11-Regular' },
} as const satisfies TypoMap;

export const typo: Record<RequiredTypoTokens, string> = createTypography(TYPO_MAP);
```

### Usage

```ts
typo.body1  // 'typo-body1' → use as a class name
```

### Token Spec

```ts
type TypoSpec = {
  primitive: `${TypoSize}-${TypoWeight}`;     // e.g. '14-Regular'
  lineHeight?: '130%' | '140%' | '150%' | '170%';
  letterSpacing?: `${number}%` | number;      // Figma percent (of font-size), e.g. '-1%' or -1
};
```

`letterSpacing` is output in `em` (`-1%` → `-0.01em`), matching Figma. When omitted, a size-based default is used.

`TypoSpec` and `LineHeightPercentage` are exported for typing individual specs.

- `TypoSize`: `160`, `144`, `128`, `112`, `96`, `80`, `72`, `64`, `56`, `48`, `44`, `40`, `36`, `32`, `28`, `26`, `24`, `22`, `20`, `18`, `17`, `16`, `15`, `14`, `13`, `12`, `11`, `10`
- `TypoWeight`: `Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`

### Required Tokens

These must all be defined in `TYPO_MAP` (TS error if missing):

```
display1,     display2,     display3
title1,       title2,       title3
heading1,     heading2,     heading3
body1,        body2,        body3
bodyReading1, bodyReading2, bodyReading3
label1,       label2,       label3
caption1,     caption2,     caption3
```

### Adding Custom Tokens

```ts
export const TYPO_MAP = {
  // ...required tokens
  badge:    { primitive: '10-Bold' },
  overline: { primitive: '12-Medium', letterSpacing: '10%' },
} as const satisfies TypoMap<'badge' | 'overline'>;

export const typo: Record<RequiredTypoTokens | 'badge' | 'overline', string> = createTypography(TYPO_MAP);
// typo.badge, typo.overline available
```

### Waiting for Fonts

```ts
import { waitForFonts } from '@sinaedle/design-system';

await waitForFonts();             // waits for font loads pending at call time
await waitForFonts('가나다 ABC');  // also starts loading the subsets this text needs
```

Pretendard is split by `unicode-range`, so a subset is fetched only when text using it is laid out. Call `waitForFonts()` after rendering, or pass `text` when you need fonts before layout (e.g. measuring text, drawing on canvas). It never rejects and resolves immediately outside the browser.

`fontsReady` is deprecated: it is created at import time and can resolve before the font is loaded.

## Color

Theme-based color system. Define color maps per theme — values are injected as CSS variables, scoped by a class on `<html>`.

### Setup

```ts
import { createColor } from '@sinaedle/design-system';
import type { ColorMap } from '@sinaedle/design-system';

const COLOR_LIGHT_MAP = {
  main05: '#F2FBFB', main10: '#E6F7F7', main20: '#C0EDED', main30: '#9DE5E4',
  main40: '#6ED2D0', main50: '#3CAAAE', main60: '#2C8D8C', main70: '#236665',
  main80: '#114847', main90: '#0F302F', main95: '#081A1A',
  sub05: '#FDF8F8',  sub10: '#FAF2F2',  sub20: '#FBE7E7',  sub30: '#FFBCBC',
  sub40: '#DA1E28',  sub50: '#B11919',  sub60: '#750E13',  sub70: '#510B0F',
  sub80: '#3F090C',  sub90: '#330709',  sub95: '#1F0405',
} as const satisfies ColorMap;

const COLOR_DARK_MAP = {
  // same keys as light, different values
  // ...
} as const satisfies ColorMap;

export const { cssVar, colors, themes, isTheme, getTheme, setTheme, onThemeChange } = createColor({
  light: COLOR_LIGHT_MAP,
  dark: COLOR_DARK_MAP,
});
```

### Usage

```ts
cssVar.main50     // 'var(--main50)'    → use in styles
colors.main50     // '#3CAAAE'          → value in the current theme
themes            // ['light', 'dark']  → all theme names (readonly)
isTheme('dark')   // true               → type guard for untrusted strings
setTheme('dark')  //                    → switches theme (toggles class on <html>)
getTheme()        // 'dark'             → current theme name
```

`light` is the default (no class on `<html>`). Other themes add a matching class (e.g. `<html class="dark">`).

- `setTheme` ignores unknown theme names at runtime and logs a warning.
- `color-scheme` is set to `dark` for the `dark` theme, so native UI (scrollbars, form controls) follows it. Other themes use `light`.
- `colors.*` values are fixed at the time of reading. Prefer `cssVar.*` in styles so they follow theme changes.

### Watching Theme Changes

`getTheme()` returns a snapshot. Subscribe to keep UI state in sync:

```ts
const theme = ref(getTheme());
const unsubscribe = onThemeChange((next) => { theme.value = next; });
```

The listener is called only when the theme actually changes.

### Persisting Theme

`isTheme` validates untrusted strings such as a saved value:

```ts
const stored = localStorage.getItem('theme');
setTheme(isTheme(stored) ? stored : 'light');
```

To avoid a flash of the light theme on load, apply the class before the app script runs. `createColor` reads the existing class on `<html>` as the initial theme:

```html
<!-- index.html, inside <head> -->
<script>
  try {
    const theme = localStorage.getItem('theme');
    if (theme && theme !== 'light') document.documentElement.classList.add(theme);
  } catch {}
</script>
```

### System Theme

```ts
import { getSystemTheme, onSystemThemeChange } from '@sinaedle/design-system';

getSystemTheme()  // 'light' | 'dark' → OS preference ('light' outside the browser)

const unsubscribe = onSystemThemeChange((next) => setTheme(next));
```

### Required Tokens

Both `light` and `dark` must define all of these (TS error if missing):

```
main05, main10, main20, main30, main40, main50, main60, main70, main80, main90, main95
sub05,  sub10,  sub20,  sub30,  sub40,  sub50,  sub60,  sub70,  sub80,  sub90,  sub95
```

### Default Tokens

Pre-defined by the package, with separate values for `light` and `dark`:

```
white, black
grey05       – grey95
whiteAlpha05 – whiteAlpha90
blackAlpha05 – blackAlpha90
danger05     – danger95
success05    – success95
warning05    – warning95
info05       – info95
```

Override any of them per theme:

```ts
const COLOR_LIGHT_MAP = {
  // ...required tokens
  grey05: '#F8F8F8',   // overrides package default
} as const satisfies ColorMap;
```

### Adding Custom Tokens

Extend `ColorMap` with extra token names. Both `light` and `dark` must define them:

```ts
const COLOR_LIGHT_MAP = {
  // ...required tokens
  accent: '#FF6B35',
} as const satisfies ColorMap<'accent'>;

const COLOR_DARK_MAP = {
  // ...required tokens
  accent: '#FF8C5A',
} as const satisfies ColorMap<'accent'>;

// cssVar.accent, colors.accent available
```

### Adding Extra Themes

Any theme beyond `light` / `dark` is treated as a partial override on top of `light`. Only specify what differs:

```ts
import type { PartialColorMap } from '@sinaedle/design-system';

const COLOR_SEPIA_MAP = {
  main10: '#F4EFE6',
  main20: '#E6D9C3',
  // ...
  grey05: '#3A2C1D',
} as const satisfies PartialColorMap;

export const colorSystem = createColor({
  light: COLOR_LIGHT_MAP,
  dark: COLOR_DARK_MAP,
  sepia: COLOR_SEPIA_MAP,
});

colorSystem.setTheme('sepia');  // <html class="sepia">
```

Unspecified tokens fall back to `light`. Use `PartialColorMap<'accent'>` if your custom tokens are involved.

### Type Helpers

```ts
import type { ThemeNameOf, ColorKeyOf } from '@sinaedle/design-system';

type ThemeName = ThemeNameOf<typeof colorSystem>;  // 'light' | 'dark' | 'sepia'
type ColorKey  = ColorKeyOf<typeof colorSystem>;   // 'main05' | ... | 'accent'
```

### Utilities

```ts
import { withAlpha, hexToRgb, hexToRgba } from '@sinaedle/design-system';

withAlpha(cssVar.main50, 0.3)  // 'color-mix(in srgb, var(--main50) 30%, transparent)'
hexToRgb('#ffffff')            // 'rgb(255, 255, 255)'
hexToRgba('#e3e3e3', 0.3)      // 'rgba(227, 227, 227, 0.3)'
```

- `withAlpha` works with any CSS color, including CSS variables, so it follows theme changes. Prefer it over `hexToRgba(colors.xxx, ...)`.
- `hexToRgb` / `hexToRgba` accept 3, 4, 6 and 8-digit HEX and return `''` for invalid input. Alpha in the input is ignored (`hexToRgba` uses its `alpha` argument).
- Alpha arguments are clamped to `[0, 1]`.

## Radius

Radius tokens are defined as CSS variables in `tokens.css`. Reference them from TS with `radius`:

```ts
import '@sinaedle/design-system/tokens.css';
import { radius, RADIUS_TOKENS } from '@sinaedle/design-system';
import type { RadiusToken } from '@sinaedle/design-system';

radius.m       // 'var(--radius-m)'
RADIUS_TOKENS  // ['4xs', '3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl']
```

| Token | Value |
|---|---|
| `4xs` | 2px |
| `3xs` | 4px |
| `2xs` | 6px |
| `xs` | 8px |
| `s` | 10px |
| `m` | 12px |
| `l` | 16px |
| `xl` | 20px |
| `2xl` | 24px |
