import { type AppletConfig } from '../../types'
import { applyAppletConfig } from '../config/applier'

/**
 * configイベントハンドラーを設定
 * アプレットの配置とサイズを適用
 */
export const setupConfigHandler = (): void => {
  addEventListener('config', (e: Event) => {
    const customEvent = e as CustomEvent<{ iframe: HTMLIFrameElement; content: AppletConfig }>
    const { iframe, content: config } = customEvent.detail

    applyAppletConfig(iframe, config)
  })
}
