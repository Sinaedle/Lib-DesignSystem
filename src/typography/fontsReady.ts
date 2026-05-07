export const fontsReady: Promise<void> =
  typeof document !== 'undefined' && 'fonts' in document
    ? document.fonts.ready.then(() => undefined)
    : Promise.resolve();