
## Quick Start

```ts
// Static type token
import '@sinaedle/design-system/tokens.css';

// Set-up type token
import { createTypography, createColor } from '@sinaedle/design-system';
createTypography({ ... });
createColor({ ... });
```

## Typography

Token-based typography. Map semantic tokens to typographic primitives — only the tokens you map get injected as styles.

### Setup

```ts
// Load the font (registers Pretendard + sets it as default font-family)
import '@sinaedle/design-system/pretendard.css';
```

```ts
// Define your token map
import { createTypography } from '@sinaedle/design-system';
import type { RequiredTypoTokens, TypoMap } from '@sinaedle/design-system';

export const TYPO_MAP = {
  display1: { primitive: '160-ExtraBold' },
  display2: { primitive: '144-ExtraBold' },
  display3: { primitive: '128-ExtraBold' },
  title1: { primitive: '32-SemiBold' },
  title2: { primitive: '24-SemiBold' },
  title3: { primitive: '20-SemiBold' },
  heading1: { primitive: '72-Bold' },
  heading2: { primitive: '56-Bold' },
  heading3: { primitive: '48-Bold' },
  body1: { primitive: '17-Medium' },
  body2: { primitive: '56-Bold' },
  body3: { primitive: '48-Bold' },
  bodyReading1: { primitive: '17-Medium', lineHeight: '170%' },
  bodyReading2: { primitive: '56-Bold', lineHeight: '170%' },
  bodyReading3: { primitive: '48-Bold', lineHeight: '170%' },
  label1: { primitive: '72-Bold' },
  label2: { primitive: '56-Bold' },
  label3: { primitive: '48-Bold' },
  caption1: { primitive: '16-Regular' },
  caption2: { primitive: '14-Regular' },
  caption3: { primitive: '12-Regular' },
} as const satisfies TypoMap;

export const typo: Record<RequiredTypoTokens, string> = createTypography(TYPO_MAP);
```

### Token Spec

```ts
type TypoSpec = {
  primitive: `${TypoSize}-${TypoWeight}`;     // e.g. '14-Regular'
  lineHeight?: '130%' | '140%' | '150%' | '170%';
  letterSpacing?: `${number}%` | number;
};
```

### Required Tokens

These must all be defined in `TYPO_MAP` (TS error if missing):
display1, display2, display3
title1,   title2,   title3
header1,  header2,  header3
body1,    body2,    body3
caption1, caption2, caption3

### Adding Custom Tokens

```ts
export const TYPO_MAP = {
  // ...required tokens
  badge:    { primitive: '10-Bold' },
  overline: { primitive: '12-Medium', letterSpacing: '150%' },
} as const satisfies TypoMap<'badge' | 'overline'>;

export const typo: Record<RequiredTypoTokens | 'badge' | 'overline', string> = createTypography(TYPO_MAP);
// typo.badge, typo.overline available
```

## Color

Theme-based color system. Define color maps per theme — values are injected as CSS variables, scoped by a class on `<html>`.

### Setup

```ts
import { createColor } from '@sinaedle/design-system';
import type { ColorMap, PartialColorMap } from '@sinaedle/design-system';

const COLOR_LIGHT_MAP = {
  main10: '#E6F7F7', main20: '#C0EDED', main30: '#9DE5E4',
  main40: '#6ED2D0', main50: '#3CAAAE', main60: '#2C8D8C',
  main70: '#236665', main80: '#114847', main90: '#0F302F',
  sub10: '#FAF2F2',  sub20: '#FBE7E7',  sub30: '#FFBCBC',
  sub40: '#DA1E28',  sub50: '#B11919',  sub60: '#750E13',
  sub70: '#510B0F',  sub80: '#3F090C',  sub90: '#330709',
} as const satisfies ColorMap;

const COLOR_DARK_MAP = {
  // same keys as light, different values
  // ...
} as const satisfies ColorMap;

export const { cssVar, colors, setTheme } = createColor({
  light: COLOR_LIGHT_MAP,
  dark: COLOR_DARK_MAP,
});
```

### Usage

```ts
cssVar.main50  // 'var(--main50)'      → use in styles
colors.main50  // '#3CAAAE'             → current theme value
setTheme('dark')                       // toggles class on 
```

`light` is the default (no class on `<html>`). Other themes add a matching class (e.g. `<html class="dark">`).

### Required Tokens

Both `light` and `dark` must define all of these (TS error if missing):

```
main10, main20, main30, main40, main50, main60, main70, main80, main90
sub10,  sub20,  sub30,  sub40,  sub50,  sub60,  sub70,  sub80,  sub90
```

### Default Tokens

`grey05`–`grey90`, `error`, `success`, `warning`, `info` are pre-defined by the package. Override any of them per theme:

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
const COLOR_SEPIA_MAP = {
  main10: '#F4EFE6',
  main20: '#E6D9C3',
  // ...
  grey05: '#3A2C1D',
} as const satisfies PartialColorMap;

const theme = createColor({
  light: COLOR_LIGHT_MAP,
  dark: COLOR_DARK_MAP,
  sepia: COLOR_SEPIA_MAP,
});

setTheme('sepia');  // 
```

Unspecified tokens fall back to `light`. Use `PartialColorMap<'accent'>` if your custom tokens are involved.

### Type Helpers

```ts
import type { ThemeNameOf, ColorKeyOf } from '@sinaedle/design-system';

type ThemeName = ThemeNameOf;  // 'light' | 'dark' | 'sepia'
type ColorKey  = ColorKeyOf;   // 'main10' | ... | 'accent'
```