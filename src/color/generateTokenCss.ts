
export function generateTokenColor(
  map: Record<string, string>,
  selector: string,
): string {
  const lines = Object.entries(map).map(([k, v]) => `  --${k}: ${v};`);
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}