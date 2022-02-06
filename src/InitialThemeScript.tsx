import HeadModule from 'next/head.js'

import { dataAttributeTheme, localStorageKeyTheme, styleElementId, themes } from './theme.config.js'

/**
 * Nwxt.js only provides CommonJs exports.
 *
 * @see https://github.com/vercel/next.js/issues/30402
 */
/* @ts-expect-error CommonJS module. */
const { default: Head } = HeadModule

const setInitialThemeScript = `const theme = localStorage.getItem('${localStorageKeyTheme}')
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
    <Head>
      <script id="set-initial-theme" dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
      <style id={styleElementId} />
    </Head>
  )
}
