import { SELECTORS, LINK_TARGETS, ERROR_MESSAGES } from '@/lib/constants'
import { logWarning } from '@/lib/utils/errors'

/**
 * iframe内のリンクをiframe内で開くようにする
 * リンクのtarget属性を調整し、クリック時にiframe内で遷移するようにする
 *
 * @param iframe - リンクハンドリングを設定するiframe要素
 * @remarks クロスオリジンの場合はアクセスできないため、エラーは無視
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
      // クロスオリジンの場合はアクセスできないため、デバッグログのみ出力
      logWarning(ERROR_MESSAGES.CANNOT_ACCESS_IFRAME, e)
    }
  })
}
