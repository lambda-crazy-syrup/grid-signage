import { type AppletConfigEvent } from '@/types'
import { applyAppletConfig } from '@/lib/config/applier'
import { EVENT_TYPES } from '@/lib/constants'

/**
 * configイベントハンドラーを設定
 * アプレットの配置とサイズを適用
 * 'config'カスタムイベントを受信して、アプレット設定を適用
 */
export const setupConfigHandler = (): void => {
  addEventListener(EVENT_TYPES.CONFIG, (e: Event) => {
    const customEvent = e as AppletConfigEvent
    const { iframe, content: config } = customEvent.detail

    applyAppletConfig(iframe, config)
  })
}
