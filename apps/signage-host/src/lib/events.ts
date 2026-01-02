import { AppletConfigSchema, type AppletConfig } from '../types'
import { AppletFrames } from '../AppletFrames'
import { z } from 'zod'

/**
 * エラーハンドラーを設定
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

/**
 * postMessageハンドラーを設定
 */
export const setupMessageHandler = (appletFrames: AppletFrames): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      console.warn('Invalid origin:', event.origin)
      return
    }

    const iframe = appletFrames.getIframeByWindow(event.source as Window)
    if (iframe === undefined) {
      console.warn('Unknown source')
      return
    }

    try {
      const config = AppletConfigSchema.parse(event.data.content)
      const detail = { iframe, content: config }
      const customEvent = new CustomEvent(event.data.type, { detail })
      dispatchEvent(customEvent)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Invalid applet config:', error.issues)
      } else {
        console.error('Failed to parse applet config:', error)
      }
    }
  })
}

/**
 * configイベントハンドラーを設定
 */
export const setupConfigHandler = (): void => {
  addEventListener('config', (e: Event) => {
    const customEvent = e as CustomEvent<{ iframe: HTMLIFrameElement; content: AppletConfig }>
    const { iframe, content: config } = customEvent.detail

    iframe.style.cssText = `
      grid-column: ${config.grid_column};
      grid-row   : ${config.grid_row};
      width      : calc(var(--length) * ${config.width});
      height     : calc(var(--length) * ${config.height});
      border     : none;
    `

    const length = getComputedStyle(document.documentElement).getPropertyValue('--length')
    if (iframe.contentDocument?.body) {
      iframe.contentDocument.body.style.zoom = `calc(${length.slice(0, -2)}  / ${config.cell_size})`
    }
  })
}
