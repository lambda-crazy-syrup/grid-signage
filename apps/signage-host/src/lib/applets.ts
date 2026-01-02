import { AppsConfigSchema, type AppletManifest } from '../types'
import { createAppletIframe } from './iframe'
import { AppletFrames } from '../AppletFrames'
import { z } from 'zod'

/**
 * アプレットを読み込む
 */
export const loadApplets = async (
  container: HTMLElement,
  appletFrames: AppletFrames
): Promise<void> => {
  try {
    const resp = await fetch('apps.json')
    if (!resp.ok) {
      throw new Error(`Failed to fetch apps.json: ${resp.statusText}`)
    }

    const rawData = await resp.json()
    const data = AppsConfigSchema.parse(rawData)

    data.forEach((applet: AppletManifest) => {
      const iframe = createAppletIframe(applet)
      appletFrames.push(iframe)
      container.appendChild(iframe)
    })
  } catch (error) {
    console.error('Failed to load applets:', error)
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.issues)
    }
  }
}
