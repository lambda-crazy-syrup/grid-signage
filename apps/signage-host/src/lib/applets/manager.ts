import { type AppletManifest } from '../../types'
import { AppletFrames } from '../../AppletFrames'
import { createAppletIframe } from '../iframe/create'

/**
 * アプレットを追加
 */
export const addApplet = (
  applet: AppletManifest,
  container: HTMLElement,
  appletFrames: AppletFrames
): void => {
  const iframe = createAppletIframe(applet)
  appletFrames.push(iframe)
  container.appendChild(iframe)
}

/**
 * 複数のアプレットを追加
 */
export const addApplets = (
  applets: AppletManifest[],
  container: HTMLElement,
  appletFrames: AppletFrames
): void => {
  applets.forEach((applet) => {
    addApplet(applet, container, appletFrames)
  })
}
