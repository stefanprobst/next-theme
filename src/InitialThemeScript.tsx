import HeadModule from 'next/head.js'
import ScriptModule from 'next/script.js'
import { Fragment } from 'react'

import { dataAttributeTheme, localStorageKeyTheme, styleElementId, themes } from './theme.config.js'

/**
 * Nwxt.js only provides CommonJs exports.
 *
 * @see https://github.com/vercel/next.js/issues/30402
 */
/* @ts-expect-error CommonJS module. */
const { default: Head } = HeadModule
/* @ts-expect-error CommonJS module. */
const { default: Script } = ScriptModule

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
    <Fragment>
      <Script
        id="set-initial-theme"
        dangerouslySetInnerHTML={{ __html: setInitialThemeScript }}
        strategy="beforeInteractive"
      />
      <Head>
        <style id={styleElementId} />
      </Head>
    </Fragment>
  )
}
