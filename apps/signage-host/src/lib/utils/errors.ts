import { z } from 'zod'
import { ERROR_MESSAGES } from '../constants'

/**
 * アプレット関連のエラークラス
 */
export class AppletError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'AppletError'
    // Error.captureStackTraceが利用可能な場合（Node.js環境など）
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppletError)
    }
  }
}

/**
 * エラーコードの定義
 */
export const ERROR_CODES = {
  CONFIG_LOAD_FAILED: 'CONFIG_LOAD_FAILED',
  CONFIG_VALIDATION_FAILED: 'CONFIG_VALIDATION_FAILED',
  INVALID_MESSAGE_FORMAT: 'INVALID_MESSAGE_FORMAT',
  IFRAME_NOT_FOUND: 'IFRAME_NOT_FOUND',
  CONTAINER_NOT_FOUND: 'CONTAINER_NOT_FOUND',
  CROSS_ORIGIN_ACCESS: 'CROSS_ORIGIN_ACCESS',
} as const

/**
 * 設定ファイルの読み込みエラーを作成
 */
export const createConfigLoadError = (cause: unknown): AppletError => {
  const message = cause instanceof Error ? cause.message : String(cause)
  return new AppletError(
    `${ERROR_MESSAGES.FAILED_TO_FETCH_CONFIG} ${message}`,
    ERROR_CODES.CONFIG_LOAD_FAILED,
    cause
  )
}

/**
 * 設定のバリデーションエラーを作成
 */
export const createConfigValidationError = (error: z.ZodError): AppletError => {
  return new AppletError(
    `${ERROR_MESSAGES.INVALID_APPLET_CONFIG} ${error.issues.map(i => i.message).join(', ')}`,
    ERROR_CODES.CONFIG_VALIDATION_FAILED,
    error
  )
}

/**
 * メッセージ形式エラーを作成
 */
export const createInvalidMessageError = (data: unknown): AppletError => {
  return new AppletError(
    `Invalid message format: ${JSON.stringify(data)}`,
    ERROR_CODES.INVALID_MESSAGE_FORMAT,
    data
  )
}

/**
 * iframeが見つからないエラーを作成
 */
export const createIframeNotFoundError = (): AppletError => {
  return new AppletError(
    ERROR_MESSAGES.UNKNOWN_SOURCE,
    ERROR_CODES.IFRAME_NOT_FOUND
  )
}

/**
 * コンテナが見つからないエラーを作成
 */
export const createContainerNotFoundError = (): AppletError => {
  return new AppletError(
    ERROR_MESSAGES.CONTAINER_NOT_FOUND,
    ERROR_CODES.CONTAINER_NOT_FOUND
  )
}

/**
 * エラーをログに出力
 * エラーの種類に応じて適切なログレベルで出力
 */
export const logError = (error: unknown, context?: string): void => {
  if (error instanceof AppletError) {
    console.error(`[${error.code}] ${error.message}`, context ? `Context: ${context}` : '')
    if (error.cause) {
      console.error('Cause:', error.cause)
    }
  } else if (error instanceof z.ZodError) {
    console.error(ERROR_MESSAGES.INVALID_APPLET_CONFIG, error.issues)
  } else if (error instanceof Error) {
    console.error(error.message, context ? `Context: ${context}` : '')
    if (error.stack) {
      console.error(error.stack)
    }
  } else {
    console.error('Unknown error:', error, context ? `Context: ${context}` : '')
  }
}

/**
 * 警告をログに出力
 */
export const logWarning = (message: string, ...args: unknown[]): void => {
  console.warn(message, ...args)
}
