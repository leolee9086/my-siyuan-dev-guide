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

## 2024-07-27 (由织补充)

-   **文件**: `appendDailyNoteBlock.md`
-   **修改**:
    -   在文档末尾添加了 "在线测试" 区块。
    -   该区块使用 `<apiTester>` Vue 组件，允许用户在浏览器中直接测试 `/api/block/appendDailyNoteBlock` API。
    -   提供了 `notebook`, `data`, `dataType` 三个参数的输入字段和描述。
-   **原因**:
    -   根据用户要求，模仿 `getBlockDOM.md` 的方式为 `appendDailyNoteBlock.md` 添加交互式测试功能。
    -   优化文档，使其更易于理解和使用该 API。 

## {{YYYY-MM-DD}} (织)

- **修改文件**: `appendBlock.md`
- **内容**: 
    - 在文档末尾新增了 "### 通过辅助函数创建 MCP 工具示例" 章节。
    - 该章节提供了一个 TypeScript 代码示例，演示了如何使用 `my-siyuan-dev-guide/docs/guide/creating-mcp-siyuan-tools.md` 中定义的 `createSiyuanMcpToolDefinition` 辅助函数，来为 `/api/block/appendBlock` API 创建一个 MCP (Model Context Protocol) 工具。
    - 示例中包括了工具的 `inputShape` (与 API 参数对应)、`transformSiyuanResponse` 回调函数的实现（用于处理 API 响应并返回新块信息），并展示了如何在调用辅助函数时传入默认的 API URL 和一个演示用的 API Token (``)。
    - 添加了相关的注意事项，引导读者参考辅助函数的完整文档和注意 Token 安全。
- **目的**: 
    - 为 `/api/block/appendBlock` API 文档提供一个实际的应用示例，展示如何将其快速封装为 MCP 工具。
    - 进一步推广和说明 `createSiyuanMcpToolDefinition` 辅助函数的用法和便利性。
- **记录时间**: {{YYYY-MM-DD HH:MM:SS Z}} 

### 2025-05-14 (织)

*   **批量修改**: 为 `/d:/siyuan/my-siyuan-dev-guide/docs/kernel-api/block/` 目录下的所有 Markdown 文档（除 `AInote.md` 和 `index.md` 外）统一添加/更新了页首和页尾的社区维护声明及赞助链接。
    *   **目标**: 确保每个文档都包含以下标准格式的文字块：
        ```markdown
        > 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
        >
        > 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
        ```
    *   **逻辑**:
        1.  读取每个目标文件的原始内容。
        2.  分离 YAML frontmatter 和正文内容。
        3.  从正文内容的开头和末尾移除任何已存在的上述标准文字块及其相邻的空行，以获得"纯净"的核心内容。
        4.  按照"Frontmatter -> 空行 -> 标准文字块 -> 空行 -> 纯净核心内容 (如果存在) -> 空行 -> 标准文字块 -> 文件末尾换行"的结构重新构建文件内容。
    *   **结果**: 大部分文件被修改以符合此结构。部分已符合标准的文件（如 `appendBlock.md`）内容未发生变动。
*   **记录时间**: 2025-05-14 12:07:09 GMT+0800 (中国标准时间) 