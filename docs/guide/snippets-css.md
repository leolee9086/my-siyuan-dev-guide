# CSS 代码片段指南

## 定义

CSS 代码片段 (Code Snippet) 是思源笔记提供的一种轻量级界面定制方式。它允许用户直接编写 CSS 代码来调整思源笔记的视觉外观。

> 如果你对 CSS 还不太熟悉，推荐先学习基础知识。**[菜鸟教程 CSS](https://www.runoob.com/css/css-tutorial.html)** 是一个不错的起点。

## 如何管理

详细的管理方式请参考：**[CSS 代码片段管理](./css-snippets/css-management.md)**

## 加载机制

CSS 片段的加载方式和相关 API 介绍请参考：**[CSS 代码片段加载机制](./css-snippets/css-loading-mechanism.md)**

## 作用域与主要用途

关于 CSS 片段的全局作用域及其常见应用场景，请参考：**[CSS 代码片段的作用域与主要用途](./css-snippets/css-scope-and-usecases.md)**

## 局限性

*   只能编写标准的 CSS 代码，无法实现动态逻辑。
*   对思源 DOM 结构的依赖：如果你的 CSS 选择器依赖于非常特定的 DOM 结构，当思源版本更新导致结构变化时，样式可能会失效。

## 调试

调试 CSS 片段的最佳方式是使用浏览器的开发者工具（通常按 F12 或通过右下角菜单打开）：

1.  **检查元素**: 在"元素"（Elements）面板中，找到你想要修改的界面元素。
2.  **查看样式**: 在"样式"（Styles）面板中，可以看到应用到该元素的所有 CSS 规则，包括来自你的代码片段的规则（通常可以通过其 `<style>` 标签的 ID 识别，如 `#snippetCSS...`）。
3.  **实时编辑**: 你可以直接在"样式"面板中修改 CSS 规则，实时预览效果。调试满意后，再将最终的代码复制回思源的代码片段设置中保存。 

## 示例

更多示例请参考：**[CSS 代码片段示例](./css-snippets/css-snippet-examples.md)**