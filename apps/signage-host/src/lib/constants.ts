/**
 * アプリケーション全体で使用する定数
 */

// 設定ファイル
export const CONFIG_FILE = 'apps.json' as const

// イベントタイプ
export const EVENT_TYPES = {
  CONFIG: 'config',
} as const

// CSS変数名
export const CSS_VARS = {
  LENGTH: '--length',
} as const

// iframe sandbox属性
export const SANDBOX_ATTRIBUTES = 'allow-scripts allow-same-origin allow-forms allow-popups' as const

// DOMセレクタ
export const SELECTORS = {
  CONTAINER: '.container',
  LINKS: 'a[href]',
} as const

// エラーメッセージ
export const ERROR_MESSAGES = {
  NAVIGATION_BLOCKED: 'Unsafe attempt to initiate navigation',
  CONTAINER_NOT_FOUND: 'Container element not found',
  INVALID_ORIGIN: 'Invalid origin:',
  UNKNOWN_SOURCE: 'Unknown source',
  FAILED_TO_FETCH_CONFIG: 'Failed to fetch apps.json:',
  INVALID_APPLET_CONFIG: 'Invalid applet config:',
  FAILED_TO_PARSE_CONFIG: 'Failed to parse applet config:',
  CANNOT_ACCESS_IFRAME: 'Cannot access iframe content (cross-origin):',
} as const

// リンクターゲット
export const LINK_TARGETS = {
  SELF: '_self',
  PARENT: '_parent',
  TOP: '_top',
} as const
