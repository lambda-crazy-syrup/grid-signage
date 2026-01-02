import { type AppletManifest } from '@/types'
import { setIframeAttributes } from '@/lib/iframe/attributes'
import { setupLinkHandling } from '@/lib/iframe/linkHandling'
import { setupNavigation } from '@/lib/iframe/navigation'

/**
 * アプレット用のiframeを作成
 * 属性設定、リンクハンドリング、ナビゲーション監視を設定
 *
 * @param applet - アプレットのマニフェスト
 * @returns 作成されたiframe要素
 */
export const createAppletIframe = (applet: AppletManifest): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')
  iframe.src = applet.src

  setIframeAttributes(iframe, applet)
  setupLinkHandling(iframe)
  setupNavigation(iframe)

  return iframe
}
