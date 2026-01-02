export class AppletFrames {
  private frames: HTMLIFrameElement[] = []

  push(iframe: HTMLIFrameElement): void {
    this.frames.push(iframe)
  }

  getIframeByWindow(window: Window): HTMLIFrameElement | undefined {
    return this.frames.find(iframe => iframe.contentWindow === window)
  }
}
