# <%= extensionName %>

一个基于 Vue.js 和 Webview 的 VS Code 插件模板。

## 功能特性

- ✅ 基于 Vue.js 3 + TypeScript
- ✅ 支持多语言国际化
- ✅ Webview 集成
- ✅ TypeScript 支持
- ✅ ESLint + Prettier 代码规范
- ✅ PNPM 工作区支持

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

1. 启动监听模式编译：
```bash
pnpm run watch
```

2. 在 VS Code 中调试：
   - 按 `F5` 或点击"调试"按钮
   - 在新窗口中测试你的插件

### 构建插件

```bash
pnpm run package
```

这会生成一个 `.vsix` 文件，可以直接安装到 VS Code 中。

## 项目结构

```
├── packages/
│   ├── extension/     # VS Code 插件主程序
│   ├── libs/          # 共享库和工具
│   └── view/          # Vue.js Webview 前端
├── scripts/           # 构建脚本
└── ...
```

## 主要文件

- `packages/extension/src/extension.ts` - 插件入口点
- `packages/extension/src/BaseViewProvider.ts` - Webview 提供者
- `packages/view/src/App.vue` - Vue 应用主组件
- `packages/libs/src/messenger.ts` - 消息传递工具

## 开发指南

### 添加新功能

1. 在 `packages/extension/src/` 中添加新的命令
2. 在 `packages/view/src/App.vue` 中添加对应的 UI 组件
3. 使用 `messenger.ts` 在插件和 Webview 之间通信

### 自定义样式

- 使用 Tailwind CSS 进行样式设计
- 修改 `packages/view/src/index.css` 来添加全局样式

### 国际化

- 在 `packages/libs/src/locales/` 中添加新的语言文件
- 使用 `$t()` 函数在 Vue 组件中访问翻译文本

## 许可证

MIT License - 详情请查看 [LICENSE](LICENSE) 文件。

## 作者

- **作者**: <%= authorName %>
- **发布者**: <%= publisherName %>
- **邮箱**: <%= authorEmail %>

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本
- Vue.js 3 + TypeScript 支持
- Webview 集成
- 多语言支持