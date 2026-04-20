import { SIZES, WEIGHTS } from './constants';

export type TypoSize = typeof SIZES[number];
export type TypoWeight = keyof typeof WEIGHTS;
export type TypoPrimitive = `${TypoSize}-${TypoWeight}`;

export type LineHeightPercentage = '130%' | '140%' | '150%' | '170%';
export type LineHeightBySize = Record<typeof SIZES[number], Record<LineHeightPercentage, number>>;
export type LineHeightDefaultBySizeType = Record<typeof SIZES[number], LineHeightPercentage>;

export type TypoSpec = {
  primitive: TypoPrimitive;
  lineHeight?: LineHeightPercentage;
  letterSpacing?: `${number}%` | number;
};

export type RequiredTypoTokens =
  'display1' |
  'display2' |
  'display3' |
  'title1' |
  'title2' |
  'title3' |
  'heading1' |
  'heading2' |
  'heading3' |
  'body1' |
  'body2' |
  'body3' |
  'bodyReading1' |
  'bodyReading2' |
  'bodyReading3' |
  'label1' |
  'label2' |
  'label3' |
  'caption1' |
  'caption2' |
  'caption3';

export type TypoMap<Extra extends string = never> =
  Record<RequiredTypoTokens | Extra, TypoSpec>;