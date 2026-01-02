import { type AppletManifest } from '@/types'

/**
 * iframeの属性を設定
 */
export const setIframeAttributes = (iframe: HTMLIFrameElement, applet: AppletManifest): void => {
  iframe.scrolling = 'no'
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups')

  if (applet.id) {
    iframe.id = applet.id
    console.debug(`iframe created with id: ${applet.id}`)
  }
}
