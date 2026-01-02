/**
 * アプレットのiframe要素を管理するクラス
 */
export class AppletFrames {
  private frames: HTMLIFrameElement[] = []

  /**
   * iframeを追加
   *
   * @param iframe - 追加するiframe要素
   */
  push(iframe: HTMLIFrameElement): void {
    this.frames.push(iframe)
  }

  /**
   * Windowオブジェクトから対応するiframeを取得
   *
   * @param window - 検索するWindowオブジェクト
   * @returns 対応するiframe要素、見つからない場合はundefined
   */
  getIframeByWindow(window: Window): HTMLIFrameElement | undefined {
    return this.frames.find(iframe => iframe.contentWindow === window)
  }
}
