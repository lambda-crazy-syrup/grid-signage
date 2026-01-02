/**
 * グリッドサイズ計算
 */
export const calculateGridLength = (): number => {
  const aspectRatio = window.innerWidth / window.innerHeight
  return aspectRatio >= 16 / 9 ? window.innerWidth / 16 : window.innerHeight / 16
}

/**
 * グリッドを初期化
 */
export const initializeGrid = (): void => {
  const length = calculateGridLength()
  document.documentElement.style.setProperty('--length', `${length}px`)
}
