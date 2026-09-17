export type SystemTheme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const getMediaQuery = (): MediaQueryList | null =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(DARK_QUERY)
    : null;

/**
 * Read the OS color scheme preference.
 *
 * @returns 'dark' if the OS prefers dark mode, otherwise 'light' (also outside the browser)
 */
export const getSystemTheme = (): SystemTheme =>
  getMediaQuery()?.matches ? 'dark' : 'light';

/**
 * Subscribe to OS color scheme changes.
 *
 * @returns unsubscribe function
 */
export const onSystemThemeChange = (listener: (theme: SystemTheme) => void): (() => void) => {
  const query = getMediaQuery();
  if (!query) return () => {};

  const handler = (event: MediaQueryListEvent) => listener(event.matches ? 'dark' : 'light');
  query.addEventListener('change', handler);
  return () => query.removeEventListener('change', handler);
};
