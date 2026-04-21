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
  whiteAlpha05: '#FFFFFF0D',
  whiteAlpha10: '#FFFFFF1A',
  whiteAlpha20: '#FFFFFF33',
  whiteAlpha30: '#FFFFFF4D',
  whiteAlpha40: '#FFFFFF66',
  whiteAlpha50: '#FFFFFF80',
  whiteAlpha60: '#FFFFFF99',
  whiteAlpha70: '#FFFFFFB3',
  whiteAlpha80: '#FFFFFFCC',
  whiteAlpha90: '#FFFFFFE6',
};

export const BLACK_ALPHA_LIGHT = {
  blackAlpha05: '#0000000D',
  blackAlpha10: '#0000001A',
  blackAlpha20: '#00000033',
  blackAlpha30: '#0000004D',
  blackAlpha40: '#00000066',
  blackAlpha50: '#00000080',
  blackAlpha60: '#00000099',
  blackAlpha70: '#000000B3',
  blackAlpha80: '#000000CC',
  blackAlpha90: '#000000E6',
};

export const WHITE_ALPHA_DARK = {
  whiteAlpha05: '#FFFFFFE6',
  whiteAlpha10: '#FFFFFFCC',
  whiteAlpha20: '#FFFFFFB3',
  whiteAlpha30: '#FFFFFF99',
  whiteAlpha40: '#FFFFFF80',
  whiteAlpha50: '#FFFFFF66',
  whiteAlpha60: '#FFFFFF4D',
  whiteAlpha70: '#FFFFFF33',
  whiteAlpha80: '#FFFFFF1A',
  whiteAlpha90: '#FFFFFF0D',
};

export const BLACK_ALPHA_DARK = {
  blackAlpha05: '#000000E6',
  blackAlpha10: '#000000CC',
  blackAlpha20: '#000000B3',
  blackAlpha30: '#00000099',
  blackAlpha40: '#00000080',
  blackAlpha50: '#00000066',
  blackAlpha60: '#0000004D',
  blackAlpha70: '#00000033',
  blackAlpha80: '#0000001A',
  blackAlpha90: '#0000000D',
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
