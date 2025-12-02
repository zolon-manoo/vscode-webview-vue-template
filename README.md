# 基于 Vue 3 的侧边栏视图扩展

<p align="center">
  <img src="./Screenshot.png" width="350" alt="模板截图">
</p>

这是一个基于 Vue 3 和 Vite 构建的模板，可用于创建 VSCode 侧边栏扩展。该模板通过提供结构化代码并利用 Vite 构建工具来编译和打包扩展，以便部署到 VSCode。此模板包含了快速开始构建扩展所需的一切。借助此模板，您可以利用 Vue 3 的特性和功能来构建强大且交互性强的 VSCode 扩展。

## 包含功能：
- [x] Typescript
- [x] Vue 3
- [x] Vite
- [x] Tailwindcss
	- [x] VSCode 默认样式的 Tailwind 配置
- [x] 通过 unplugin 使用 Iconify
- [x] 通过 unplugin 使用 I18n
- [x] 良好的代码检查
- [x] CircleCI
- [x] 基础的 VSCode API 消息示例

## 快速开始：

安装依赖：
- `yarn install`

修改以下文件：
- `package.json`
	- 将所有的 `vue3baseextension` 替换为您的扩展 ID
	- 将所有的 `vue-3-base-view` 替换为视图 ID
	- 将所有的 `Vue 3 Base Extension` 替换为扩展名称
	- 将 `default.png` 替换为您自己的扩展图标

运行扩展：
- 在控制台中输入 `yarn watch`
- 在 `extension.ts` 上按 `f5` 打开调试窗口（或在菜单中选择"调试" -> "运行扩展"）
- 导航到左侧边栏看到的扩展图标（或打开命令面板(`Ctrl/Cmd + Shift + P`)并选择 `View: Vue 3 Base Extension` 来打开 webview 视图。）

## 推荐的 VSCode 扩展

- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [I18n A11y](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
- [Iconify Intellisense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

## 参考资料
- [Webviews](https://code.visualstudio.com/api/extension-guides/webview)
- [UX Guidelines](https://code.visualstudio.com/api/ux-guidelines/overview)
- [Webview view API](https://code.visualstudio.com/api/references/vscode-api#WebviewView)
- [Theme Guidelines](https://code.visualstudio.com/api/references/theme-color)