import { defaultLightColors } from "./constants";

export type RequiredColorTokens =
  'main05' |
  'main10' |
  'main20' |
  'main30' |
  'main40' |
  'main50' |
  'main60' |
  'main70' |
  'main80' |
  'main90' |
  'sub05' |
  'sub10' |
  'sub20' |
  'sub30' |
  'sub40' |
  'sub50' |
  'sub60' |
  'sub70' |
  'sub80' |
  'sub90';

export type ThemeNameOf<T> = T extends { setTheme: (theme: infer N) => void } ? N : never;
export type ColorKeyOf<T> = T extends { colors: Record<infer K, string> } ? K : never;

export type DefaultColorKey = keyof typeof defaultLightColors;

export type ColorMap<Extra extends string = never> =
  & Record<RequiredColorTokens, string>
  & { [K in DefaultColorKey]?: string }
  & { [K in Exclude<Extra, RequiredColorTokens | DefaultColorKey>]: string };

export type PartialColorMap<Extra extends string = never> = Partial<ColorMap<Extra>>;