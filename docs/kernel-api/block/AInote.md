# 这个区段由开发者编写,未经允许禁止AI修改


## 修改记录

### 2024-07-27 (织)

*   **新增 `checkBlockRef.html`**: 为缺失的 `/api/block/checkBlockRef` API 创建了初始文档页面。
    *   根据 `siyuan/kernel/api/block.go#L33` 实现确定接口细节。
    *   **样式统一**: 使用 `styles.css` 和 `api-tester.js`。
    *   **添加社区维护说明**: 加入包含用户爱发电链接的 blockquote。
    *   **结构调整**: 添加 `<header>`, `<nav>`(含源码链接), `<main>`, `<footer>` 使结构统一。
*   **新增 `getBlockBreadcrumb.html`**: 为缺失的 `/api/block/getBlockBreadcrumb` API 创建了初始文档页面。
    *   根据 `siyuan/kernel/api/block.go#L520` 及相关 model 实现确定接口细节。
    *   **样式统一**: 使用 `styles.css` 和 `api-tester.js`。
    *   **添加社区维护说明**: 加入包含用户爱发电链接的 blockquote。
    *   **结构调整**: 添加 `<header>`, `<nav>`(含源码链接), `<main>`, `<footer>` 使结构统一。
*   **新增 `getBlockDOM.html`**: 为缺失的 `/api/block/getBlockDOM` API 创建了初始文档页面。
    *   根据 `siyuan/kernel/api/block.go#L638` 实现确定接口细节。
    *   **样式统一**: 使用 `styles.css` 和 `api-tester.js`。
    *   **添加社区维护说明**: 加入包含用户爱发电链接的 blockquote。
    *   **结构调整**: 添加 `<header>`, `<nav>`(含源码链接), `<main>`, `<footer>` 使结构统一。
*   **新增 `getRefIDs.html`**: 为缺失的 `/api/block/getRefIDs` API 创建了初始文档页面。
    *   根据 `siyuan/kernel/api/block.go#L445` 及相关 model 实现确定接口细节，并说明了特殊情况。
    *   **样式统一**: 使用 `styles.css` 和 `api-tester.js`。
    *   **添加社区维护说明**: 加入包含用户爱发电链接的 blockquote。
    *   **结构调整**: 添加 `<header>`, `<nav>`(含源码链接), `<main>`, `<footer>` 使结构统一。
*   **新增 `getUnfoldedParentID.html`**: 为缺失的 `/api/block/getUnfoldedParentID` API 创建了初始文档页面。
    *   根据 `siyuan/kernel/api/block.go#L245` 实现确定接口细节。
    *   **样式统一**: 使用 `styles.css` 和 `api-tester.js`。
    *   **添加社区维护说明**: 加入包含用户爱发电链接的 blockquote。
    *   **结构调整**: 添加 `<header>`, `<nav>`(含源码链接), `<main>`, `<footer>` 使结构统一。 

### 2025-05-12 (织)

*   **修改 `getBlockDOM.html`**:
    *   **原因**: `check_sponsorship.js` 脚本报告此文件的赞助链接位置或结构不正确。原有的赞助信息位于一个 `class="important-note"` 的 `<blockquote>` 中，不符合脚本的严格校验规则（期望 `<blockquote>` 为 `<body>` 直接子元素，且包含特定文本和样式）。
    *   **操作**: 
        1.  保留了原有的 `class="important-note"` 的 `<blockquote>` 及其内容（社区维护提示和非标准赞助链接）。
        2.  在 `<footer>` 标签之前，额外插入了标准的赞助链接 `<blockquote>` 区块。此区块包含规范的文本内容（"本文档由 AI 织 协助编写..."）、指向 `https://afdian.com/a/leolee9086?tab=feed` 的链接，并应用了 `style="text-align: right; font-size: small;"` 样式。
    *   **目的**: 确保页面符合 `check_sponsorship.js` 的校验标准，同时保留了原有的重要提示信息。 

## API 核对与前端用法发现 (织)

*   **getBlockInfo.md**: 核对了 `block.go` 源码，修正了文档中的返回值描述 (补充 `type` 字段和错误情况)，更新了示例，添加了请求方法和错误码说明。
*   **getBlockDOM.md**: 核对了 `block.go` 源码。**重要发现**：通过搜索 `siyuan/app/src/` 目录 (包括精确搜索)，未找到前端代码直接调用 `/api/block/getBlockDOM` 的示例。推测前端可能通过其他方式获取 DOM 或此 API 主要面向第三方。据此修正了文档，特别是失败时的 `data` 结构，并添加了相应说明。 

### 2025-05-12 21:42:50 UTC (织)

*   **修改 `getBlockDOM.md`**:
    *   移除了文件末尾的版权信息 `© 2024 思源笔记 API 文档 (社区维护)`。
    *   在示例代码后添加了在线 API 测试所需的 HTML 结构（表单、输入框、按钮、结果展示区域）。
    *   提供了实现该在线测试功能的 JavaScript 代码片段，该代码负责获取输入、调用 API 并显示结果。建议将此 JS 代码集成到共享的 `api-tester.js` 文件中以供复用。 

### 2025-05-12 22:06:20 UTC (织)

*   **新增 `ApiTester.vue` 组件**: 在 `docs/.vitepress/theme/components/` 目录下创建了可复用的 Vue 组件 `ApiTester.vue`，用于提供统一的 API 在线测试体验。
    *   **功能**: 包含 API Token 和服务器地址的配置（保存到 localStorage）、动态参数表单生成、请求发送、请求/响应展示、加载状态和错误处理。
    *   **修复**: 解决了初始化时 `props.params` 未定义导致 `forEach` 报错的问题，将表单值初始化逻辑移入 `onMounted`。
*   **修改 `getBlockDOM.md`**: 
    *   移除了之前添加的原始 HTML 和 JS 测试代码。
    *   引入并使用了新的 `<ApiTester>` 组件来提供在线测试功能。
    *   **修复**: 修正了使用 `<ApiTester>` 时缺少必需的 `endpoint` 和 `params` prop 的 Vue 警告，为其传递了正确的 API 端点和参数定义。 

### 2025-05-12 22:07:58 UTC (织)

*   **修改 `ApiTester.vue` 组件**:
    *   **修复**: 解决了在 `sendRequest` 函数中，点击发送请求时偶尔出现的 `props.params` 为 `undefined` 导致 `forEach` 报错的问题。
    *   **操作**: 在 `sendRequest` 函数开头增加了对 `props.params` 的有效性检查（确保其存在且为数组），如果无效则提前返回并显示错误信息。 

### 2025-05-12 22:10:08 UTC (织)

*   **修改 `getBlockDOM.md`**:
    *   **增加**: 在"在线测试"标题前添加了一个使用 VitePress `danger` 容器的警告框。
    *   **内容**: 警告用户不要在不完全信任的网站或工具中输入 API Token，强调其安全风险，并说明本文档站点在线测试的相对安全性。 