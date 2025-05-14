### 插件的基本结构

一个典型的思源插件项目，在开发完成后通常包含以下文件和目录：

*   **`plugin.json` (必需)**: 插件的"身份证"，定义了插件的名称 (`name`)、版本 (`version`)、作者 (`author`)、描述 (`description`)、显示名称 (`displayName`)、兼容的思源最低版本 (`minAppVersion`)、图标 (`icon`) 等重要信息。思源后端服务会读取它来了解你的插件。
*   **`index.ts` (或你的入口 TS 文件)**: 这是你编写插件功能的主要地方，通常包含一个继承自思源 `Plugin` 基类的类。你需要将它编译成 JavaScript。
*   **`dist/index.js` (必需，编译后生成)**: 由你的 `index.ts` 编译打包而来的 JavaScript 文件。**思源后端会直接读取这个文件的内容**，然后发送给前端执行。
*   **`dist/index.css` (可选，编译后生成)**: 如果你的插件需要自定义样式，将 CSS 代码打包到这里。**思源后端会读取这个文件的内容** (如果存在)，然后发送给前端注入页面。
*   **`icon.png` (推荐)**: 插件在集市或设置里显示的图标。
*   **`README.md` (推荐)**: 详细介绍插件功能、用法和配置的文档。
*   **`i18n/` (可选)**: 存放多语言文件的目录 (如 `zh_CN.json`)。后端也会读取对应的语言文件。

**关键点**: 思源加载插件时，**后端服务会直接读取你插件目录下的 `plugin.json`、`dist/index.js`、`dist/index.css` (如果存在) 以及 `i18n/` 目录下的语言文件**。前端并不直接访问这些文件。

```json
// plugin.json 示例 (字段可能不完全准确，需参考官方文档或示例)
{
  "name": "my-cool-plugin",
  "displayName": {
    "default": "My Cool Plugin",
    "zh_CN": "我的酷炫插件"
  },
  "author": "Your Name",
  "version": "0.1.0",
  "minAppVersion": "2.10.0",
  "description": {
    "default": "This plugin does something cool.",
    "zh_CN": "这个插件能做一些很酷的事情。"
  },
  "frontend": "dist/index.js", // 通常指向编译后的 JS 入口
  "icon": "icon.png",
  "readme": "README.md",
  "i18n": [
    "en_US",
    "zh_CN"
  ]
}
``` 