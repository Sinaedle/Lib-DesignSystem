// ─────────────────────────────────────────────
// Grey scale
// ─────────────────────────────────────────────
export const GREY_SCALE_LIGHT = {
  white:  '#FFFFFF',
  grey05: '#F7F7F7;', // background color
  grey10: '#EAEAEA',
  grey20: '#DEDEDE',
  grey30: '#CFCFCF',
  grey40: '#BFBFBF',
  grey50: '#A8A8A8',
  grey60: '#949494',
  grey70: '#767676',
  grey80: '#525252',
  grey90: '#333333',
  grey95: '#1C1C1C',
  black:  '#000000',
} as const;

export const GREY_SCALE_DARK = {
  white: '#000000',
  grey05: '#111111', // background color
  grey10: '#333333',
  grey20: '#525252',
  grey30: '#767676',
  grey40: '#949494',
  grey50: '#A8A8A8',
  grey60: '#BFBFBF',
  grey70: '#CFCFCF',
  grey80: '#DEDEDE',
  grey90: '#EAEAEA',
  grey95: '#F7F7F7',
  black: '#FFFFFF',
} as const;

// ─────────────────────────────────────────────
// Alpha scale
// ─────────────────────────────────────────────
export const WHITE_ALPHA_LIGHT = {
  whiteAlpha05: 'rgba(255, 255, 255, 0.05)',
  whiteAlpha10: 'rgba(255, 255, 255, 0.10)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.20)',
  whiteAlpha30: 'rgba(255, 255, 255, 0.30)',
  whiteAlpha40: 'rgba(255, 255, 255, 0.40)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.50)',
  whiteAlpha60: 'rgba(255, 255, 255, 0.60)',
  whiteAlpha70: 'rgba(255, 255, 255, 0.70)',
  whiteAlpha80: 'rgba(255, 255, 255, 0.80)',
  whiteAlpha90: 'rgba(255, 255, 255, 0.90)',
};

export const BLACK_ALPHA_LIGHT = {
  blackAlpha05: 'rgba(0, 0, 0, 0.05)',
  blackAlpha10: 'rgba(0, 0, 0, 0.10)',
  blackAlpha20: 'rgba(0, 0, 0, 0.20)',
  blackAlpha30: 'rgba(0, 0, 0, 0.30)',
  blackAlpha40: 'rgba(0, 0, 0, 0.40)',
  blackAlpha50: 'rgba(0, 0, 0, 0.50)',
  blackAlpha60: 'rgba(0, 0, 0, 0.60)',
  blackAlpha70: 'rgba(0, 0, 0, 0.70)',
  blackAlpha80: 'rgba(0, 0, 0, 0.80)',
  blackAlpha90: 'rgba(0, 0, 0, 0.90)',
};

export const WHITE_ALPHA_DARK = {
  whiteAlpha05: 'rgba(0, 0, 0, 0.05)',
  whiteAlpha10: 'rgba(0, 0, 0, 0.10)',
  whiteAlpha20: 'rgba(0, 0, 0, 0.20)',
  whiteAlpha30: 'rgba(0, 0, 0, 0.30)',
  whiteAlpha40: 'rgba(0, 0, 0, 0.40)',
  whiteAlpha50: 'rgba(0, 0, 0, 0.50)',
  whiteAlpha60: 'rgba(0, 0, 0, 0.60)',
  whiteAlpha70: 'rgba(0, 0, 0, 0.70)',
  whiteAlpha80: 'rgba(0, 0, 0, 0.80)',
  whiteAlpha90: 'rgba(0, 0, 0, 0.90)',
};

export const BLACK_ALPHA_DARK = {
  blackAlpha05: 'rgba(255, 255, 255, 0.05)',
  blackAlpha10: 'rgba(255, 255, 255, 0.10)',
  blackAlpha20: 'rgba(255, 255, 255, 0.20)',
  blackAlpha30: 'rgba(255, 255, 255, 0.30)',
  blackAlpha40: 'rgba(255, 255, 255, 0.40)',
  blackAlpha50: 'rgba(255, 255, 255, 0.50)',
  blackAlpha60: 'rgba(255, 255, 255, 0.60)',
  blackAlpha70: 'rgba(255, 255, 255, 0.70)',
  blackAlpha80: 'rgba(255, 255, 255, 0.80)',
  blackAlpha90: 'rgba(255, 255, 255, 0.90)',
};

// ─────────────────────────────────────────────
// Semantic State scales
// ─────────────────────────────────────────────
export const DANGER_SCALE_LIGHT = {
  danger05: '#FFF8F8', // background color
  danger10: '#FFF0F0',
  danger20: '#FEDEDD',
  danger30: '#FEBCBA',
  danger40: '#FD9B99',
  danger50: '#FD726D',
  danger60: '#FC392B',
  danger70: '#DA240F',
  danger80: '#A31808',
  danger90: '#750E04',
  danger95: '#460501',
} as const;
export const DANGER_SCALE_DARK = {
  danger05: '#460501', // background color
  danger10: '#750E04',
  danger20: '#A31808',
  danger30: '#DA240F',
  danger40: '#FC392B',
  danger50: '#FD726D',
  danger60: '#FD9B99',
  danger70: '#FEBCBA',
  danger80: '#FEDEDD',
  danger90: '#FFF0F0',
  danger95: '#FFF8F8',
} as const;

export const SUCCESS_SCALE_LIGHT = {
  success05: '#F8FCF9', // background color
  success10: '#EDF8F0',
  success20: '#D6EFDE',
  success30: '#B2E1C0',
  success40: '#89D29E',
  success50: '#60C27D',
  success60: '#42AD62',
  success70: '#33854B',
  success80: '#266438',
  success90: '#1E4E2C',
  success95: '#173B21',
} as const;
export const SUCCESS_SCALE_DARK = {
  success05: '#173B21', // background color
  success10: '#1E4E2C',
  success20: '#266438',
  success30: '#33854B',
  success40: '#42AD62',
  success50: '#60C27D',
  success60: '#89D29E',
  success70: '#B2E1C0',
  success80: '#D6EFDE',
  success90: '#EDF8F0',
  success95: '#F8FCF9',
} as const;

export const WARNING_SCALE_LIGHT = {
  warning05: '#FFFAF0', // background color
  warning10: '#FFF4E0',
  warning20: '#FFE2AD',
  warning30: '#FFD07A',
  warning40: '#FFBE47',
  warning50: '#FFAC14',
  warning60: '#E09100',
  warning70: '#BD7A00',
  warning80: '#8F5D00',
  warning90: '#5C3B00',
  warning95: '#472E00',
} as const;
export const WARNING_SCALE_DARK = {
  warning05: '#472E00', // background color
  warning10: '#5C3B00',
  warning20: '#8F5D00',
  warning30: '#BD7A00',
  warning40: '#E09100',
  warning50: '#FFAC14',
  warning60: '#FFBE47',
  warning70: '#FFD07A',
  warning80: '#FFE2AD',
  warning90: '#FFF4E0',
  warning95: '#FFFAF0',
} as const;

export const INFO_SCALE_LIGHT = {
  info05: '#F1F6FE', // background color
  info10: '#E7F0FD',
  info20: '#D0E0FC',
  info30: '#A0C2F8',
  info40: '#71A3F4',
  info50: '#4184F1',
  info60: '#1165EE',
  info70: '#0E51BE',
  info80: '#0A3D8F',
  info90: '#07285F',
  info95: '#051E47',
} as const;
export const INFO_SCALE_DARK = {
  info05: '#051E47', // background color
  info10: '#07285F',
  info20: '#0A3D8F',
  info30: '#0E51BE',
  info40: '#1165EE',
  info50: '#4184F1',
  info60: '#71A3F4',
  info70: '#A0C2F8',
  info80: '#D0E0FC',
  info90: '#E7F0FD',
  info95: '#F1F6FE',
} as const;

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────
export const defaultLightColors = {
  ...GREY_SCALE_LIGHT,
  ...WHITE_ALPHA_LIGHT,
  ...BLACK_ALPHA_LIGHT,
  ...DANGER_SCALE_LIGHT,
  ...SUCCESS_SCALE_LIGHT,
  ...WARNING_SCALE_LIGHT,
  ...INFO_SCALE_LIGHT,
} as const;

export const defaultDarkColors = {
  ...GREY_SCALE_DARK,
  ...WHITE_ALPHA_DARK,
  ...BLACK_ALPHA_DARK,
  ...DANGER_SCALE_DARK,
  ...SUCCESS_SCALE_DARK,
  ...WARNING_SCALE_DARK,
  ...INFO_SCALE_DARK,
} as const;
