import { AppletConfigSchema, type AppletConfig } from '../../types'
import { AppletFrames } from '../../AppletFrames'
import { z } from 'zod'

/**
 * postMessageハンドラーを設定
 * アプレットからの設定メッセージを受信して処理
 */
export const setupMessageHandler = (appletFrames: AppletFrames): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      console.warn('Invalid origin:', event.origin)
      return
    }

    const iframe = appletFrames.getIframeByWindow(event.source as Window)
    if (iframe === undefined) {
      console.warn('Unknown source')
      return
    }

    try {
      const config = AppletConfigSchema.parse(event.data.content)
      const detail = { iframe, content: config }
      const customEvent = new CustomEvent(event.data.type, { detail })
      dispatchEvent(customEvent)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Invalid applet config:', error.issues)
      } else {
        console.error('Failed to parse applet config:', error)
      }
    }
  })
}
