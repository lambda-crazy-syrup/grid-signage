import { AppsConfigSchema, type AppletManifest } from '@/types'
import { z } from 'zod'
import { CONFIG_FILE } from '@/lib/constants'
import { createConfigLoadError, createConfigValidationError, logError } from '@/lib/utils/errors'

/**
 * apps.jsonからアプレット設定を読み込む
 *
 * @returns アプレット設定の配列
 * @throws {AppletError} ファイルの取得に失敗した場合、または設定のバリデーションに失敗した場合
 */
export const loadAppletsConfig = async (): Promise<AppletManifest[]> => {
  try {
    const resp = await fetch(CONFIG_FILE)
    if (!resp.ok) {
      throw createConfigLoadError(new Error(resp.statusText))
    }

    const rawData = await resp.json()
    const data = AppsConfigSchema.parse(rawData)

    return data
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createConfigValidationError(error)
    }
    if (error instanceof Error && error.name === 'AppletError') {
      throw error
    }
    throw createConfigLoadError(error)
  }
}

/**
 * アプレット設定の読み込みエラーを処理
 * エラーをコンソールに出力
 *
 * @param error - 発生したエラー
 */
export const handleLoadError = (error: unknown): void => {
  logError(error, 'loadAppletsConfig')
}
