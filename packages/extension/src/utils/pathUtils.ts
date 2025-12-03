import * as vscode from 'vscode';

export class ResourceResolver {
    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _extensionMode: vscode.ExtensionMode
    ) { }

    public getResourceUri({ module_dir, resourcePath }: { module_dir?: string, resourcePath: string[] }) {
        if (module_dir) {
            if (this._extensionMode === vscode.ExtensionMode.Development) {
                return vscode.Uri.joinPath(this._extensionUri, '..', module_dir, 'dist', ...resourcePath);
            } else {
                return vscode.Uri.joinPath(this._extensionUri, 'dist', module_dir, ...resourcePath);
            }
        } else {
            if (this._extensionMode === vscode.ExtensionMode.Development) {
                return vscode.Uri.joinPath(this._extensionUri, 'dist', ...resourcePath);
            } else {
                return vscode.Uri.joinPath(this._extensionUri, 'dist', ...resourcePath);
            }
        }
    }

    public getResourceRoot() {
        if (this._extensionMode === vscode.ExtensionMode.Development) {
            return vscode.Uri.joinPath(this._extensionUri, '..');
        } else {
            return vscode.Uri.joinPath(this._extensionUri);
        }
    }
}