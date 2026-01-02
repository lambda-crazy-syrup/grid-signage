import { type AppletConfig } from '@/types'

/**
 * アプレットの設定を適用
 * グリッド配置、サイズ、zoomを設定
 */
export const applyAppletConfig = (
  iframe: HTMLIFrameElement,
  config: AppletConfig
): void => {
  // グリッド配置とサイズを設定
  iframe.style.cssText = `
    grid-column: ${config.grid_column};
    grid-row   : ${config.grid_row};
    width      : calc(var(--length) * ${config.width});
    height     : calc(var(--length) * ${config.height});
    border     : none;
  `

  // iframe内のzoomを設定
  const length = getComputedStyle(document.documentElement).getPropertyValue('--length')
  if (iframe.contentDocument?.body) {
    iframe.contentDocument.body.style.zoom = `calc(${length.slice(0, -2)}  / ${config.cell_size})`
  }
}
