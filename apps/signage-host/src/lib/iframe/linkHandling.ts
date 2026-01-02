/**
 * iframe内のリンクをiframe内で開くようにする
 */
export const setupLinkHandling = (iframe: HTMLIFrameElement): void => {
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
