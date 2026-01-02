import { AppletConfigSchema, type AppletConfig } from '@/types'
import { AppletFrames } from '@/AppletFrames'
import { z } from 'zod'
import { ERROR_MESSAGES } from '@/lib/constants'

/**
 * postMessageハンドラーを設定
 * アプレットからの設定メッセージを受信して処理
 */
export const setupMessageHandler = (appletFrames: AppletFrames): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      console.warn(ERROR_MESSAGES.INVALID_ORIGIN, event.origin)
      return
    }

    const iframe = appletFrames.getIframeByWindow(event.source as Window)
    if (iframe === undefined) {
      console.warn(ERROR_MESSAGES.UNKNOWN_SOURCE)
      return
    }

    try {
      const config = AppletConfigSchema.parse(event.data.content)
      const detail = { iframe, content: config }
      const customEvent = new CustomEvent(event.data.type, { detail })
      dispatchEvent(customEvent)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(ERROR_MESSAGES.INVALID_APPLET_CONFIG, error.issues)
      } else {
        console.error(ERROR_MESSAGES.FAILED_TO_PARSE_CONFIG, error)
      }
    }
  })
}
