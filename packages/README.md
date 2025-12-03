# Vue Webview Workspace

This is a refactored version of the VS Code Webview Vue Template, organized as a pnpm workspace with multiple packages:

## Packages

1. **@vue-webview/extension** - The VS Code extension
2. **@vue-webview/view** - The Vue 3 webview UI
3. **@vue-webview/Libs** - Shared code between the extension and webview

## Development

### Initial Setup

1. Install dependencies: `pnpm install`
2. Build all packages: `pnpm run build:full`

### Running in Development Mode

- Run all packages in development mode: `pnpm run dev:full`
- Or run individual packages:
  - Extension: `pnpm run --filter @vue-webview/extension dev`
  - UI: `pnpm run --filter @vue-webview/webview-sidebar dev`
  - Libs: `pnpm run --filter @vue-webview/libs dev`

### Building for Production

- Build all packages: `pnpm run build:full`
- Or build individual packages:
  - Extension: `pnpm run --filter @vue-webview/extension build`
  - UI: `pnpm run --filter @vue-webview/webview-sidebar build`
  - Libs: `pnpm run --filter @vue-webview/libs build`

## Package Details

### @vue-webview/extension

Contains the VS Code extension code, including:

- Extension activation/deactivation
- Webview provider
- Message handling between extension and webview

### @vue-webview/view

Contains the Vue 3 webview UI, including:

- Vue components
- Internationalization (i18n)
- Styling with Tailwind CSS

### @vue-webview/Libs

Contains shared code between the extension and webview:

- Message passing utilities
- Common types and interfaces
