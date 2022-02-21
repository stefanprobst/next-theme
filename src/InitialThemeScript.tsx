import { Fragment } from 'react'

import { dataAttributeTheme, localStorageKeyTheme, styleElementId, themes } from './theme.config.js'

export const setInitialThemeScript = `const theme = localStorage.getItem('${localStorageKeyTheme}')
if (
  theme === '${themes.dark}' ||
  (theme == null && matchMedia('(prefers-color-scheme: ${themes.dark})').matches)
) {
  document.documentElement.dataset['${dataAttributeTheme}'] = '${themes.dark}'
} else {
  document.documentElement.dataset['${dataAttributeTheme}'] = '${themes.light}'
}
`

export function InitialThemeScript(): JSX.Element {
  return (
    <Fragment>
      <script id="set-initial-theme" dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
      <style id={styleElementId} />
    </Fragment>
  )
}
