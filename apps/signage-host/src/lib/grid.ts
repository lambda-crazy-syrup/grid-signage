import { CSS_VARS } from './constants'

/**
 * グリッドサイズを計算
 * アスペクト比に基づいて、16:9のグリッドセルサイズを計算
 *
 * @returns グリッドセルのサイズ（ピクセル単位）
 */
export const calculateGridLength = (): number => {
  const aspectRatio = window.innerWidth / window.innerHeight
  return aspectRatio >= 16 / 9 ? window.innerWidth / 16 : window.innerHeight / 16
}

/**
 * グリッドを初期化
 * 計算したグリッドサイズをCSS変数に設定
 */
export const initializeGrid = (): void => {
  const length = calculateGridLength()
  document.documentElement.style.setProperty(CSS_VARS.LENGTH, `${length}px`)
}
