import { AppletFrames } from '@/AppletFrames'
import '@/style.css'
import { initializeGrid } from '@/lib/grid'
import { setupErrorHandlers } from '@/lib/events/error'
import { setupMessageHandler } from '@/lib/events/message'
import { setupConfigHandler } from '@/lib/events/config'
import { loadApplets } from '@/lib/applets'
import { SELECTORS } from '@/lib/constants'
import { createContainerNotFoundError, logError } from '@/lib/utils/errors'

// アプレット管理インスタンス
const appletFrames = new AppletFrames()

// エラーハンドラーを設定
setupErrorHandlers()

// postMessageハンドラーを設定（アプレットからの設定メッセージを受信）
setupMessageHandler(appletFrames)

// ページ読み込み時の初期化処理
window.onload = async () => {
  // グリッドサイズを計算してCSS変数に設定
  initializeGrid()

  // configイベントハンドラーを設定（アプレットの配置とサイズを適用）
  setupConfigHandler()

  // コンテナ要素を取得
  const container = document.querySelector(SELECTORS.CONTAINER)
  if (!container || !(container instanceof HTMLElement)) {
    logError(createContainerNotFoundError(), 'window.onload')
    return
  }

  // apps.jsonからアプレットを読み込んで表示
  await loadApplets(container, appletFrames)
}
