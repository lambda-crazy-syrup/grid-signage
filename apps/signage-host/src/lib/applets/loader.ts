import { AppsConfigSchema, type AppletManifest } from '@/types'
import { z } from 'zod'

/**
 * apps.jsonからアプレット設定を読み込む
 */
export const loadAppletsConfig = async (): Promise<AppletManifest[]> => {
  const resp = await fetch('apps.json')
  if (!resp.ok) {
    throw new Error(`Failed to fetch apps.json: ${resp.statusText}`)
  }

  const rawData = await resp.json()
  const data = AppsConfigSchema.parse(rawData)

  return data
}

/**
 * アプレット設定の読み込みエラーを処理
 */
export const handleLoadError = (error: unknown): void => {
  console.error('Failed to load applets:', error)
  if (error instanceof z.ZodError) {
    console.error('Validation errors:', error.issues)
  }
}
