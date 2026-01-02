import { SELECTORS, LINK_TARGETS, ERROR_MESSAGES } from '@/lib/constants'

/**
 * iframe内のリンクをiframe内で開くようにする
 */
export const setupLinkHandling = (iframe: HTMLIFrameElement): void => {
  iframe.addEventListener('load', () => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) return

      const links = iframeDoc.querySelectorAll(SELECTORS.LINKS)
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement
        if (!anchor.target || anchor.target === LINK_TARGETS.PARENT || anchor.target === LINK_TARGETS.TOP) {
          anchor.target = LINK_TARGETS.SELF
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
      console.debug(ERROR_MESSAGES.CANNOT_ACCESS_IFRAME, e)
    }
  })
}
