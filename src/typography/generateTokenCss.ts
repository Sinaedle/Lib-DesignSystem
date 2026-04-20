import {
  WEIGHTS,
  LINE_HEIGHT_BY_SIZE,
  LETTER_SPACING_PERCENT_BY_SIZE,
  SIZES,
  LINE_HEIGHT_DEFAULT_BY_SIZE,
} from './constants';
import type { TypoSpec } from './tokens';

function resolveLineHeight(spec: TypoSpec, size: typeof SIZES[number]): string {
  const lineHeightsBySize = LINE_HEIGHT_BY_SIZE[size];
  const defaultLineHeightBySize = LINE_HEIGHT_DEFAULT_BY_SIZE[size];

  if(spec.lineHeight){
    return `${lineHeightsBySize[spec.lineHeight]}px`
  } else {
    return `${lineHeightsBySize[defaultLineHeightBySize]}px`
  }
}

function resolveLetterSpacing(spec: TypoSpec, size: typeof SIZES[number]): string {
  const v = spec.letterSpacing;
  const percent = v === undefined
    ? LETTER_SPACING_PERCENT_BY_SIZE[size]
    : typeof v === 'number'
      ? v
      : parseFloat(v);
  return `${percent}%`;
}

export function generateTokenTypo(map: Record<string, TypoSpec>): string {
  const lines: string[] = ['/* AUTO-GENERATED */'];

  for (const token in map) {
    const spec = map[token];
    const [sizeStr, weightName] = spec.primitive.split('-') as [string, keyof typeof WEIGHTS];
    const size = Number(sizeStr) as typeof SIZES[number];

    lines.push(
`.typo-${token} {
  font-size: ${size}px;
  font-weight: ${WEIGHTS[weightName]};
  line-height: ${resolveLineHeight(spec, size)};
  letter-spacing: ${resolveLetterSpacing(spec, size)};
}`
    );
  }

  return lines.join('\n\n') + '\n';
}