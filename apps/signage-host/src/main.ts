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

// iframe内のリンクをiframe内で開くようにする
const setupIframeLinkHandling = (iframe: HTMLIFrameElement) => {
  // iframeが読み込まれた後に処理
  iframe.addEventListener('load', () => {
    try {
      // 外部ドメインの場合はアクセスできないので、エラーを無視
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) {
        // 外部ドメインの場合は、loadイベントでナビゲーションを監視
        // 親ウィンドウでのナビゲーションを防ぐ
        return
      }

      // 同じオリジンの場合は、リンクにイベントリスナーを追加
      const links = iframeDoc.querySelectorAll('a[href]')
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement
        // target属性を_selfに設定（iframe内で開く）
        if (!anchor.target || anchor.target === '_parent' || anchor.target === '_top') {
          anchor.target = '_self'
        }
        anchor.addEventListener('click', (e) => {
          const href = anchor.href
          if (href && href !== iframe.src && !href.startsWith('#')) {
            e.preventDefault()
            // iframe内で開く
            iframe.src = href
          }
        })
      })
    } catch (e) {
      // 外部ドメインの場合はSame-Origin Policyによりアクセスできない
      // この場合は、親ウィンドウでナビゲーションをインターセプトする方法を使用
      console.debug('Cannot access iframe content (cross-origin):', e)
    }
  })
}

// エラーハンドリング: sandboxによるナビゲーションエラーを抑制
// iframe内での遷移は許可しつつ、親ウィンドウへの遷移エラーを抑制
window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('Unsafe attempt to initiate navigation')) {
    // sandboxによるナビゲーションエラーを抑制（親ウィンドウへの遷移を防ぐため）
    e.preventDefault()
    e.stopPropagation()
    return false
  }
}, true)

// unhandledrejectionイベントでもエラーを抑制
window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && typeof e.reason === 'string' && e.reason.includes('navigation')) {
    e.preventDefault()
  }
})

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

  // 既存のitem4 iframeにもリンクハンドリングを適用
  const item4Iframe = document.getElementById('item4') as HTMLIFrameElement
  if (item4Iframe) {
    setupIframeLinkHandling(item4Iframe)
    
    // 外部ドメインのiframeの場合、loadイベントでナビゲーションを監視
    // iframe内での遷移は許可されている（sandbox属性により親ウィンドウへの遷移は防がれる）
    let lastSrc = item4Iframe.src
    item4Iframe.addEventListener('load', () => {
      try {
        // 外部ドメインの場合はアクセスできないが、試行
        const currentLocation = item4Iframe.contentWindow?.location.href
        if (currentLocation && currentLocation !== lastSrc) {
          // iframe内でナビゲーションが発生した場合、srcを更新
          item4Iframe.src = currentLocation
          lastSrc = currentLocation
        }
      } catch (e) {
        // 外部ドメインの場合は無視
        // iframe内での遷移は許可されているので、エラーを抑制
      }
    })
  }

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
    setupIframeLinkHandling(iframe) // リンクハンドリングを設定
    
    // 外部ドメインのiframeの場合、loadイベントでナビゲーションを監視
    // iframe内での遷移は許可されている（sandbox属性により親ウィンドウへの遷移は防がれる）
    let lastSrc = iframe.src
    iframe.addEventListener('load', () => {
      try {
        // 外部ドメインの場合はアクセスできないが、試行
        const currentLocation = iframe.contentWindow?.location.href
        if (currentLocation && currentLocation !== lastSrc) {
          // iframe内でナビゲーションが発生した場合、srcを更新
          iframe.src = currentLocation
          lastSrc = currentLocation
        }
      } catch (e) {
        // 外部ドメインの場合は無視
        // iframe内での遷移は許可されているので、エラーを抑制
      }
    })
    
    appletFrames.push(iframe)
    const container = document.querySelector('.container')
    if (container) {
      container.appendChild(iframe)
    }
  })
}
