import { localStorageKeyTheme, dataAttributeTheme, themes, defaultTheme } from './theme.config.js'
import type { Theme, ThemeSource } from './theme.config.js'

export function isValidTheme(theme: string): theme is Theme {
  return Object.prototype.hasOwnProperty.call(themes, theme)
}

export const themeStore = {
  get(): Theme {
    const _theme =
      document.documentElement.dataset[dataAttributeTheme] ??
      localStorage.getItem(localStorageKeyTheme)
    const theme = _theme != null && isValidTheme(_theme) ? _theme : defaultTheme

    return theme
  },
  set(theme: Theme, themeSource: ThemeSource): void {
    document.documentElement.dataset[dataAttributeTheme] = theme

    if (themeSource === 'user') {
      localStorage.setItem(localStorageKeyTheme, theme)
    } else {
      localStorage.removeItem(localStorageKeyTheme)
    }
  },
}
