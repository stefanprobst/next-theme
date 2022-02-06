export const themes = { light: 'light', dark: 'dark' } as const

export type Theme = keyof typeof themes

export const defaultTheme: Theme = 'light'

export const dataAttributeTheme = 'colorScheme'

export const themeSources = { system: 'system', user: 'user' } as const

export type ThemeSource = keyof typeof themeSources

export const localStorageKeyTheme = '__color-scheme__'

export const styleElementId = '__color-scheme__'
