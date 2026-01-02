import { type AppletManifest } from '../../types'
import { setIframeAttributes } from './attributes'
import { setupLinkHandling } from './linkHandling'
import { setupNavigation } from './navigation'

/**
 * アプレット用のiframeを作成
 */
export const createAppletIframe = (applet: AppletManifest): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')
  iframe.src = applet.src

  setIframeAttributes(iframe, applet)
  setupLinkHandling(iframe)
  setupNavigation(iframe)

  return iframe
}
