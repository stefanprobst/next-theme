export const themes = { light: 'light', dark: 'dark' } as const

export type Theme = keyof typeof themes

export const defaultTheme: Theme = 'light'

export const dataAttributeTheme = 'theme'

export const themeSources = { system: 'system', user: 'user' } as const

export type ThemeSource = keyof typeof themeSources

export const localStorageKeyTheme = '__theme__'
