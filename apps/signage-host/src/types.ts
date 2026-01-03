import { z } from 'zod'

// AppletConfigのスキーマ
export const AppletConfigSchema = z.object({
  grid_column: z.number().int().positive(),
  grid_row: z.number().int().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  cell_size: z.number().positive(),
})

// AppletManifestのスキーマ
export const AppletManifestSchema = z.object({
  src: z.string().min(1),
  name: z.string().min(1),
  id: z.string().min(1).optional(),
})

// apps.json全体のスキーマ
export const AppsConfigSchema = z.array(AppletManifestSchema)

// TypeScript型の導出
export type AppletConfig = z.infer<typeof AppletConfigSchema>
export type AppletManifest = z.infer<typeof AppletManifestSchema>
export type AppsConfig = z.infer<typeof AppsConfigSchema>

// postMessage関連の型定義
export interface AppletMessage {
  type: 'config'
  content: AppletConfig
}

// カスタムイベントの型定義
export interface AppletConfigEventDetail {
  iframe: HTMLIFrameElement
  content: AppletConfig
}

export type AppletConfigEvent = CustomEvent<AppletConfigEventDetail>
