import { type AppletManifest } from '@/types'
import { SANDBOX_ATTRIBUTES } from '@/lib/constants'

/**
 * iframeの属性を設定
 */
export const setIframeAttributes = (iframe: HTMLIFrameElement, applet: AppletManifest): void => {
  iframe.scrolling = 'no'
  iframe.setAttribute('sandbox', SANDBOX_ATTRIBUTES)

  if (applet.id) {
    iframe.id = applet.id
    console.debug(`iframe created with id: ${applet.id}`)
  }
}
