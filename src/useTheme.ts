import { useEffect, useState } from 'react'

import type { Theme, ThemeSource } from './theme.config.js'
import { localStorageKeyTheme, styleElementId, themes } from './theme.config.js'
import { isValidTheme, themeStore } from './theme.js'

const transition = `*, *::before, *::after {
  transition-property: var(--color-scheme-transition-property) !important;
  transition-duration: var(--color-scheme-transition-duration) !important;
  transition-timing-function: var(--color-scheme-transition-timing-function) !important;
}`

export interface UseThemeResult {
  theme: Theme | null
  toggleTheme: () => void
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme | null>(null)

  function updateTheme(theme: Theme, themeSource: ThemeSource) {
    const element = document.getElementById(styleElementId) as HTMLStyleElement | null
    if (element?.sheet?.cssRules.length === 0) {
      element.sheet.insertRule(transition)
    }

    setTheme(theme)
    themeStore.set(theme, themeSource)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        element?.sheet?.deleteRule(0)
      })
    })
  }

  useEffect(() => {
    setTheme(themeStore.get())

    function onChangeMediaQuery(event: MediaQueryListEvent) {
      const theme = event.matches ? 'dark' : 'light'
      updateTheme(theme, 'system')
    }

    const mediaQueryList = window.matchMedia(`(prefers-color-scheme: ${themes.dark})`)
    mediaQueryList.addEventListener('change', onChangeMediaQuery)

    function onChangeThemeInOtherTab(event: StorageEvent) {
      if (event.key === localStorageKeyTheme) {
        const theme = event.newValue
        if (theme != null && isValidTheme(theme)) {
          updateTheme(theme, 'user')
        }
      }
    }

    window.addEventListener('storage', onChangeThemeInOtherTab)

    return () => {
      mediaQueryList.removeEventListener('change', onChangeMediaQuery)
      window.removeEventListener('storage', onChangeThemeInOtherTab)
    }
  }, [])

  function toggleTheme() {
    updateTheme(theme === 'dark' ? 'light' : 'dark', 'user')
  }

  return { theme, toggleTheme }
}
