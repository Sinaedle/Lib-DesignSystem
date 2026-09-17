const hasFontApi = (): boolean =>
  typeof document !== 'undefined' && 'fonts' in document;

/**
 * @deprecated Created at import time, before any font load has started,
 * so it can resolve before Pretendard is actually loaded. Use `waitForFonts()` instead.
 */
export const fontsReady: Promise<void> = hasFontApi()
  ? document.fonts.ready.then(() => undefined)
  : Promise.resolve();

/**
 * Wait for pending font loads at the time of the call.
 *
 * Pretendard is split by unicode-range, so subsets are only fetched once text using them is laid out.
 * Pass `text` to start loading the subsets that text needs before waiting
 * (e.g. before measuring text or drawing on canvas).
 *
 * Never rejects. Resolves immediately outside the browser.
 *
 * @param text - Optional text whose glyphs must be loaded
 *
 * @example
 * await waitForFonts();              // after the UI has rendered
 * await waitForFonts('가나다 ABC');   // before measuring specific text
 */
export const waitForFonts = async (text?: string): Promise<void> => {
  if (!hasFontApi()) return;

  try {
    if (text) {
      await document.fonts.load('16px "Pretendard Variable"', text);
    }
    await document.fonts.ready;
  } catch {
    // Font loading failures fall back to system fonts; nothing to wait for.
  }
};
