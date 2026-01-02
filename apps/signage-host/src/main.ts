import { AppletFrames } from './AppletFrames'
import './style.css'

interface AppletConfig {
  grid_column: number
  grid_row: number
  width: number
  height: number
  cell_size: number
}

interface AppletManifest {
  src: string
  name: string
}

const appletFrames = new AppletFrames()

window.addEventListener('message', (event: MessageEvent) => {
  if (event.origin !== window.location.origin) {
    console.warn('Invalid origin:', event.origin)
    return
  }
  const iframe = appletFrames.getIframeByWindow(event.source as Window)
  if (iframe === undefined) {
    console.warn('Unknown source')
    return
  }
  const detail = { iframe: iframe, content: event.data.content }
  const customEvent = new CustomEvent(event.data.type, { detail })
  dispatchEvent(customEvent)
})

window.onload = async () => {
  // calculate and set --length
  const aspectRatio = window.innerWidth / window.innerHeight
  const length = (() => {
    if (aspectRatio >= 16 / 9) {
      return window.innerWidth / 16
    } else {
      return window.innerHeight / 16
    }
  })()
  document.documentElement.style.setProperty('--length', `${length}px`)

  // set event listeners
  addEventListener('config', (e: Event) => {
    const customEvent = e as CustomEvent<{ iframe: HTMLIFrameElement; content: AppletConfig }>
    const config = customEvent.detail.content
    const iframe = customEvent.detail.iframe
    iframe.style.cssText = `
      grid-column: ${config.grid_column};
      grid-row   : ${config.grid_row};
      width      : calc(var(--length) * ${config.width});
      height     : calc(var(--length) * ${config.height});
      border     : none;
    `
    const l = getComputedStyle(document.documentElement).getPropertyValue('--length')
    if (iframe.contentDocument?.body) {
      iframe.contentDocument.body.style.zoom = `calc(${l.slice(0, -2)}  / ${config.cell_size})` //slice to drop "px"
    }
  })

  // load applets
  const resp = await fetch('apps.json')
  const data: AppletManifest[] = await resp.json()
  data.forEach((applet) => {
    // create and place applet
    const iframe = document.createElement('iframe')
    iframe.src = applet.src
    iframe.scrolling = 'no'
    appletFrames.push(iframe)
    const container = document.querySelector('.container')
    if (container) {
      container.appendChild(iframe)
    }
  })
}
