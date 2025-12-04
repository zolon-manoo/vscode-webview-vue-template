import * as vscode from 'vscode'
import { ResourceResolver } from './utils/pathUtils'
import { ExtensionMessenger } from '@vue-webview/libs'

export class BaseViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView
  private _messenger?: ExtensionMessenger

  constructor(private readonly resourceResolver: ResourceResolver) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext<unknown>,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this.resourceResolver.getResourceRoot()],
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    // Initialize messenger
    this._messenger = new ExtensionMessenger(webviewView)

    // Handle messages from webview
    this._messenger.onMessage(message => {
      switch (message.command) {
        case 'alert':
          vscode.window.showErrorMessage(message.data as string)
          return
        case 'info':
          vscode.window.showInformationMessage(message.data as string)
          return
      }
    })
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // 简单方案：优先检查开发环境路径，然后回退到生产环境路径
    const scriptUri = this.resourceResolver.getResourceUri({
      module_dir: 'view',
      resourcePath: ['assets', 'index.js'],
    })
    const styleResetUri = this.resourceResolver.getResourceUri({
      module_dir: 'view',
      resourcePath: ['assets', 'index.css'],
    })

    const webviewScriptUri = webview.asWebviewUri(scriptUri)
    const webviewStyleUri = webview.asWebviewUri(styleResetUri)

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce()

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}' 'unsafe-eval';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${webviewStyleUri}" rel="stylesheet">
				<title>Vue Webview Workspace</title>
			</head>
			<body>
				<div id="app"></div>
				<script nonce="${nonce}" src="${webviewScriptUri}"></script>
			</body>
			</html>`
  }
}

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
