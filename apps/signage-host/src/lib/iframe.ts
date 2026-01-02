import { type AppletManifest } from '../types'

/**
 * iframe内のリンクをiframe内で開くようにする
 */
const setupLinkHandling = (iframe: HTMLIFrameElement): void => {
  iframe.addEventListener('load', () => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) return

      const links = iframeDoc.querySelectorAll('a[href]')
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement
        if (!anchor.target || anchor.target === '_parent' || anchor.target === '_top') {
          anchor.target = '_self'
        }
        anchor.addEventListener('click', (e) => {
          const href = anchor.href
          if (href && href !== iframe.src && !href.startsWith('#')) {
            e.preventDefault()
            iframe.src = href
          }
        })
      })
    } catch (e) {
      console.debug('Cannot access iframe content (cross-origin):', e)
    }
  })
}

/**
 * iframe内のナビゲーションを監視
 */
const setupNavigation = (iframe: HTMLIFrameElement): void => {
  let lastSrc = iframe.src
  iframe.addEventListener('load', () => {
    try {
      const currentLocation = iframe.contentWindow?.location.href
      if (currentLocation && currentLocation !== lastSrc) {
        iframe.src = currentLocation
        lastSrc = currentLocation
      }
    } catch (e) {
      // 外部ドメインの場合は無視
    }
  })
}

/**
 * アプレット用のiframeを作成
 */
export const createAppletIframe = (applet: AppletManifest): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')
  iframe.src = applet.src
  iframe.scrolling = 'no'
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups')

  if (applet.id) {
    iframe.id = applet.id
    console.debug(`iframe created with id: ${applet.id}`)
  }

  setupLinkHandling(iframe)
  setupNavigation(iframe)

  return iframe
}
