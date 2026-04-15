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

export const typo: Record = createTypography(TYPO_MAP);
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

export const typo = createTypography(TYPO_MAP);
// typo.badge, typo.overline available
```