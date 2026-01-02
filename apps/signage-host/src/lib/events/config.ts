import { type AppletConfig } from '../../types'

/**
 * configイベントハンドラーを設定
 * アプレットの配置とサイズを適用
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
