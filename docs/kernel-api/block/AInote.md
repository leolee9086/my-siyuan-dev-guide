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