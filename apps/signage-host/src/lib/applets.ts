import { AppletFrames } from '@/AppletFrames'
import { loadAppletsConfig, handleLoadError } from '@/lib/applets/loader'
import { addApplets } from '@/lib/applets/manager'

/**
 * アプレットを読み込んで表示
 */
export const loadApplets = async (
  container: HTMLElement,
  appletFrames: AppletFrames
): Promise<void> => {
  try {
    const applets = await loadAppletsConfig()
    addApplets(applets, container, appletFrames)
  } catch (error) {
    handleLoadError(error)
  }
}
