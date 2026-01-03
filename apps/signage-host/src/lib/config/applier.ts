import { type AppletConfig } from '@/types'
import { CSS_VARS } from '@/lib/constants'

/**
 * アプレットの設定を適用
 * グリッド配置、サイズ、zoomを設定
 *
 * @param iframe - 設定を適用するiframe要素
 * @param config - 適用するアプレット設定
 * @throws {Error} iframe.contentDocumentにアクセスできない場合（クロスオリジン）
 */
export const applyAppletConfig = (
  iframe: HTMLIFrameElement,
  config: AppletConfig
): void => {
  // グリッド配置とサイズを設定
  iframe.style.cssText = `
    grid-column: ${config.grid_column};
    grid-row   : ${config.grid_row};
    width      : calc(var(${CSS_VARS.LENGTH}) * ${config.width});
    height     : calc(var(${CSS_VARS.LENGTH}) * ${config.height});
    border     : none;
  `

  // iframe内のzoomを設定
  const length = getComputedStyle(document.documentElement).getPropertyValue(CSS_VARS.LENGTH)
  if (iframe.contentDocument?.body) {
    iframe.contentDocument.body.style.zoom = `calc(${length.slice(0, -2)}  / ${config.cell_size})`
  }
}
