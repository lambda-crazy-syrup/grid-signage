import { AppletFrames } from './AppletFrames'
import './style.css'
import { initializeGrid } from './lib/grid'
import { setupErrorHandlers, setupMessageHandler, setupConfigHandler } from './lib/events'
import { loadApplets } from './lib/applets'

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
  const container = document.querySelector('.container')
  if (!container || !(container instanceof HTMLElement)) {
    console.error('Container element not found')
    return
  }

  // apps.jsonからアプレットを読み込んで表示
  await loadApplets(container, appletFrames)
}
