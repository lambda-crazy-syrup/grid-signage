import { AppletConfigSchema, type AppletMessage, type AppletConfigEventDetail } from '@/types'
import { AppletFrames } from '@/AppletFrames'
import { z } from 'zod'
import { ERROR_MESSAGES, EVENT_TYPES } from '@/lib/constants'

/**
 * postMessageのデータがAppletMessage型かどうかを判定
 *
 * @param data - 判定するデータ
 * @returns AppletMessage型の場合true
 */
const isAppletMessage = (data: unknown): data is AppletMessage => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    'content' in data &&
    data.type === EVENT_TYPES.CONFIG
  )
}

/**
 * postMessageハンドラーを設定
 * アプレットからの設定メッセージを受信して処理
 * オリジンチェック、型チェック、バリデーションを実行
 *
 * @param appletFrames - アプレット管理インスタンス
 */
export const setupMessageHandler = (appletFrames: AppletFrames): void => {
  window.addEventListener('message', (event: MessageEvent<unknown>) => {
    // オリジンチェック
    if (event.origin !== window.location.origin) {
      console.warn(ERROR_MESSAGES.INVALID_ORIGIN, event.origin)
      return
    }

    // iframeの特定
    const iframe = appletFrames.getIframeByWindow(event.source as Window)
    if (iframe === undefined) {
      console.warn(ERROR_MESSAGES.UNKNOWN_SOURCE)
      return
    }

    // メッセージ型チェック
    if (!isAppletMessage(event.data)) {
      console.warn('Invalid message format:', event.data)
      return
    }

    try {
      // コンテンツのバリデーション
      const config = AppletConfigSchema.parse(event.data.content)
      const detail: AppletConfigEventDetail = { iframe, content: config }
      const customEvent = new CustomEvent<AppletConfigEventDetail>(event.data.type, { detail })
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
