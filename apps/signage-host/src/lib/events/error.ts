import { ERROR_MESSAGES } from '@/lib/constants'

/**
 * エラーハンドラーを設定
 * sandboxによるナビゲーションエラーを抑制
 * グローバルエラーと未処理のPromise拒否をキャッチ
 */
export const setupErrorHandlers = (): void => {
  // sandboxによるナビゲーションエラーを抑制
  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes(ERROR_MESSAGES.NAVIGATION_BLOCKED)) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }, true)

  // unhandledrejectionイベントでもエラーを抑制
  window.addEventListener('unhandledrejection', (e) => {
    if (typeof e.reason === 'string' && e.reason.includes('navigation')) {
      e.preventDefault()
    }
  })
}
