# CSS 代码片段加载机制

当思源启动或相关设置更新时，前端会：
1.  通过内部 API (`/api/snippet/getSnippet`) 获取所有已保存且标记为启用的 CSS 片段内容。
2.  检查 CSS 片段的总开关 (`window.siyuan.config.snippet.enabledCSS`) 是否开启。
3.  如果总开关开启且片段自身也启用，则将该段 CSS 代码动态地创建一个 `<style>` 标签（例如 `<style id="snippetCSS{片段ID}">...</style>`）。
4.  将这个 `<style>` 标签插入到当前 HTML 文档的 `<head>` 元素中。

除了通过思源笔记的图形用户界面管理代码片段外，开发者还可以通过一组后端 API 来以编程方式获取、创建、更新和删除代码片段。这对于批量操作、自动化或与其他工具集成非常有用。

相关的 API 文档如下：

*   **获取代码片段**: [`/api/snippet/getSnippet`](../../kernel-api/snippet/getSnippet.md) - 用于检索已存在的代码片段列表，可按类型、启用状态和关键词过滤。
*   **设置代码片段**: [`/api/snippet/setSnippet`](../../kernel-api/snippet/setSnippet.md) - 用于创建新片段或（全量）更新现有片段列表。
*   **移除代码片段**: [`/api/snippet/removeSnippet`](../../kernel-api/snippet/removeSnippet.md) - 用于根据 ID 删除特定的代码片段。

请注意，特别是 `/api/snippet/setSnippet` API 执行的是全量替换操作，使用时请务必仔细阅读其文档说明，以避免意外丢失数据。 