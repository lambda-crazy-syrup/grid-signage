/**
 * iframe内のナビゲーションを監視
 */
export const setupNavigation = (iframe: HTMLIFrameElement): void => {
  let lastSrc = iframe.src
  iframe.addEventListener('load', () => {
    try {
      const currentLocation = iframe.contentWindow?.location.href
      if (currentLocation && currentLocation !== lastSrc) {
        iframe.src = currentLocation
        lastSrc = currentLocation
      }
    } catch (e) {
      // 外部ドメインの場合は無視
    }
  })
}
