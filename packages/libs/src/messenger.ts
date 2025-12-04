// Message passing utilities for communication between VS Code extension and Webview

export interface Message {
  command: string
  data?: unknown
}

export interface Messenger {
  postMessage(message: Message): void
  onMessage(callback: (message: Message) => void): void
}

// VS Code WebviewPanel interface
interface WebviewPanel {
  webview: {
    postMessage(message: Message): void
    onDidReceiveMessage(callback: (message: Message) => void): void
  }
}

// VS Code extension side messenger
export class ExtensionMessenger implements Messenger {
  private panel: WebviewPanel

  constructor(panel: WebviewPanel) {
    this.panel = panel
  }

  postMessage(message: Message): void {
    this.panel.webview.postMessage(message)
  }

  onMessage(callback: (message: Message) => void): void {
    this.panel.webview.onDidReceiveMessage(callback)
  }
}

// Webview side messenger
export class WebviewMessenger implements Messenger {
  postMessage(message: Message): void {
    // @ts-expect-error - VS Code API注入
    window.vscode.postMessage(message)
  }

  onMessage(callback: (message: Message) => void): void {
    window.addEventListener('message', event => {
      callback(event.data)
    })
  }
}

// Utility function to create a messenger based on environment
export function createMessenger(type: 'extension' | 'webview', panel?: WebviewPanel): Messenger {
  if (type === 'extension' && panel) {
    return new ExtensionMessenger(panel)
  } else {
    return new WebviewMessenger()
  }
}
