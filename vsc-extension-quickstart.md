# 欢迎使用您的 VS Code 扩展

## 文件夹内容

* 此文件夹包含您的扩展所需的所有文件。
* `package.json` - 这是清单文件，您可以在其中声明扩展和命令。
  * 示例插件注册了一个命令，并定义了其标题和命令名称。有了这些信息，VS Code 可以在命令面板中显示该命令，而无需加载插件。
* `src/extension.ts` - 这是主文件，您将在其中提供命令的实现。
  * 该文件导出一个函数 `activate`，这是您的扩展第一次被激活时调用的函数（在这种情况下是通过执行命令）。在 `activate` 函数内部，我们调用 `registerCommand`。
  * 我们将包含命令实现的函数作为第二个参数传递给 `registerCommand`。

## 快速上手

* 按 `F5` 打开一个加载了您的扩展的新窗口。
* 通过按 (`Ctrl+Shift+P` 或 Mac 上的 `Cmd+Shift+P`) 打开命令面板并输入 `Hello World` 来运行您的命令。
* 在 `src/extension.ts` 中的代码内设置断点以调试您的扩展。
* 在调试控制台中找到您的扩展的输出。

## 进行更改

* 更改 `src/extension.ts` 中的代码后，您可以从调试工具栏重新启动扩展。
* 您也可以重新加载 (`Ctrl+R` 或 Mac 上的 `Cmd+R`) 加载了您的扩展的 VS Code 窗口以加载您的更改。

## 探索 API

* 当您打开文件 `node_modules/@types/vscode/index.d.ts` 时，可以打开完整的 API 集合。

## 更进一步

* [遵循 UX 指南](https://code.visualstudio.com/api/ux-guidelines/overview) 创建与 VS Code 原生界面和模式无缝集成的扩展。
 * 通过 [捆绑您的扩展](https://code.visualstudio.com/api/working-with-extensions/bundling-extension) 减少扩展大小并提高启动时间。
 * 在 VS Code 扩展市场 [发布您的扩展](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)。
 * 通过设置 [持续集成](https://code.visualstudio.com/api/working-with-extensions/continuous-integration) 自动化构建。