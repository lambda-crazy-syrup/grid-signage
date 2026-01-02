import { type AppletManifest } from '@/types'
import { AppletFrames } from '@/AppletFrames'
import { createAppletIframe } from '@/lib/iframe/create'

/**
 * アプレットを追加
 * iframeを作成してコンテナに追加し、AppletFramesに登録
 *
 * @param applet - 追加するアプレットのマニフェスト
 * @param container - アプレットを追加するコンテナ要素
 * @param appletFrames - アプレット管理インスタンス
 */
export const addApplet = (
  applet: AppletManifest,
  container: HTMLElement,
  appletFrames: AppletFrames
): void => {
  const iframe = createAppletIframe(applet)
  appletFrames.push(iframe)
  container.appendChild(iframe)
}

/**
 * 複数のアプレットを追加
 * 各アプレットを順番に追加
 *
 * @param applets - 追加するアプレットのマニフェスト配列
 * @param container - アプレットを追加するコンテナ要素
 * @param appletFrames - アプレット管理インスタンス
 */
export const addApplets = (
  applets: AppletManifest[],
  container: HTMLElement,
  appletFrames: AppletFrames
): void => {
  applets.forEach((applet) => {
    addApplet(applet, container, appletFrames)
  })
}
