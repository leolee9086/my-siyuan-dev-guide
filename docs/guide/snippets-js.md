# JavaScript 代码片段指南

## 定义

JavaScript 代码片段 (Code Snippet) 是思源笔记提供的一种轻量级方式，允许用户注入自定义的 JavaScript 代码来扩展或修改思源笔记前端的一些行为。

## 如何管理

*   **入口**: 与 CSS 片段类似，你可以在 "设置" -> "外观" -> "代码片段" 区域找到管理界面。
*   **操作**: 在这里，你可以添加新的 JS 片段、编辑现有片段、为片段命名、启用或禁用特定片段，以及启用或禁用所有 JS 片段的总开关。
*   **存储**: 这些片段的内容由思源笔记在本地负责存储和管理。

## 加载机制

当思源启动或相关设置更新时，前端会：
1.  通过内部 API (`/api/snippet/getSnippet`) 获取所有已保存且标记为启用的 JS 片段内容。
2.  检查 JS 片段的总开关 (`window.siyuan.config.snippet.enabledJS`) 是否开启。
3.  如果总开关开启且片段自身也启用，则将该段 JavaScript 代码动态地创建一个 `<script type="text/javascript" id="snippetJS{片段ID}">...</script>` 标签。
4.  将这个 `<script>` 标签追加到当前 HTML 文档的 `<head>` 元素中。**脚本会在被添加到文档时立即执行**。

## 作用域与能力

*   **全局作用域**: JS 代码片段运行在思源主窗口的**全局 `window` 作用域**下。
*   **完全访问权限**: 因此，它们可以访问和修改全局变量、操作整个页面的 DOM、调用任何全局可用的 JavaScript 函数（包括思源本身可能暴露在全局的一些 API 或对象，但不推荐依赖未明确声明为公开 API 的内部函数）。
*   **事件监听**: 可以在 `window`、`document` 或特定元素上添加事件监听器。

## 主要用途

*   **添加简单快捷键**: 监听键盘事件执行特定操作。
*   **自定义 DOM 操作**: 例如，在特定条件下修改某些元素的属性或内容。
*   **与其他扩展机制交互**: 例如，调用已加载插件暴露的全局方法。
*   **实现简单的自动化任务或界面增强**。

## ⚠️ 安全风险与注意事项

*   **信任来源**: 由于 JS 代码片段拥有对前端环境的完全访问权限，请**极其谨慎**地编写或使用来自他人的代码片段。确保你完全理解代码的功能，尤其是从网络上复制粘贴的代码。
*   **潜在破坏性**: 不当的 JS 代码片段可能会干扰思源的正常功能、导致性能问题、甚至引入安全漏洞（例如，如果代码片段与外部服务通信而没有适当的安全措施）。
*   **错误处理**: 你编写的 JS 代码片段应该包含适当的错误处理 (try-catch)，以避免因为一个小错误而影响整个应用的运行。
*   **避免冲突**: 注意变量名和函数名，尽量使用闭包或唯一的前缀来避免与思源自身或其他扩展的全局变量/函数产生冲突。
*   **依赖稳定性**: 尽量不要依赖思源前端那些未明确作为公开 API 的内部函数或 DOM 结构，它们可能在版本更新中被修改。

## 调试

调试 JS 代码片段主要使用浏览器的开发者工具：

1.  **控制台 (Console)**: 使用 `console.log()` 输出变量或调试信息，查看运行时错误。
2.  **源代码 (Sources)**: 你通常可以在源代码面板中找到动态添加的脚本（可能以 `VM...` 或类似形式出现，或者根据其 ID `#snippetJS...`）。在这里，你可以设置断点、单步执行代码、查看变量值等。
3.  **作用域检查**: 可以在控制台中检查全局变量 (`window`) 的状态，确认你的代码是否如预期那样运行。 