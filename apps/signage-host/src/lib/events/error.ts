/**
 * エラーハンドラーを設定
 * sandboxによるナビゲーションエラーを抑制
 */
export const setupErrorHandlers = (): void => {
  // sandboxによるナビゲーションエラーを抑制
  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('Unsafe attempt to initiate navigation')) {
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
