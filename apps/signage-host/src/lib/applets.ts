import { AppletFrames } from '@/AppletFrames'
import { loadAppletsConfig, handleLoadError } from '@/lib/applets/loader'
import { addApplets } from '@/lib/applets/manager'

/**
 * アプレットを読み込んで表示
 * apps.jsonから設定を読み込み、コンテナに追加
 *
 * @param container - アプレットを追加するコンテナ要素
 * @param appletFrames - アプレット管理インスタンス
 * @throws {Error} アプレットの読み込みに失敗した場合
 */
export const loadApplets = async (
  container: HTMLElement,
  appletFrames: AppletFrames
): Promise<void> => {
  try {
    const applets = await loadAppletsConfig()
    addApplets(applets, container, appletFrames)
  } catch (error) {
    handleLoadError(error)
  }
}
