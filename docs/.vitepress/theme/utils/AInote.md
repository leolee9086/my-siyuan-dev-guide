# 这个区段由开发者编写,未经允许禁止AI修改

---

## [2025-05-14 02:12 织] - 代码片段操作后自动重载UI

- **文件**: `my-siyuan-dev-guide/docs/.vitepress/theme/utils/siyuanApi.js`
- **修改函数**: `handleInstallSnippet`
- **变更**:
    - 在成功调用 `/api/snippet/setSnippet` API（即代码片段成功保存到思源笔记后）之后，紧接着调用了 `/api/ui/reloadUI` API。
    - 使用 `await fetchSiyuanRequest(config, '/api/ui/reloadUI', 'POST', {});` 实现。
- **原因**: 用户要求在代码片段安装或更新（变化）之后自动重载思源笔记的用户界面。这样可以确保用户立即看到代码片段的更改生效，提升用户体验。
- **扩展修改 [2025-05-14 02:14 织]**:
    - **`handleUninstallSnippet`**: 在成功调用 `/api/snippet/removeSnippet` 后，同样增加了对 `/api/ui/reloadUI` 的调用。
    - **`handleToggleSnippetEnable`**: 在成功调用 `/api/snippet/setSnippet` (用于更新启用状态) 后，也增加了对 `/api/ui/reloadUI` 的调用。
    - **原因**: 统一用户体验，确保在安装、卸载、启用或禁用代码片段后，UI 都能自动刷新以反映最新状态。 