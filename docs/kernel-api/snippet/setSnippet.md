---
title: 创建/更新代码片段 (setSnippet)
---
# 端点

/api/snippet/setSnippet

# 创建/更新代码片段 (setSnippet)

[首页](../index.html) | [Snippet API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/snippet.go#L78)

## 功能描述

此 API 端点 `POST /api/snippet/setSnippet` 用于**设置全新的代码片段 (Snippet) 列表**。

**⚠️ 重要：这是一个全量替换操作！** 调用此 API 时，您提供的 `snippets` 数组将**完全覆盖**您当前所有的代码片段。如果您只想修改或添加单个片段，您需要先通过 `/api/snippet/getSnippet` 获取所有现有片段，在本地进行修改/添加，然后将修改后的完整列表通过此 API 发送回去。如果发送一个空数组，将会删除所有代码片段。

## 请求参数

请求体必须是 JSON 格式，包含一个名为 `snippets` 的数组：

-   `snippets` (array of objects): **必填**。包含一个或多个代码片段对象的数组。**此数组将成为操作完成后系统中全新的、完整的代码片段列表。**
    -   `id` (string): 片段的唯一 ID。
        -   **对于希望保留 ID 的现有片段**：提供该片段的准确 ID。
        -   **对于新创建的片段或希望由系统生成 ID 的片段**：可以将此字段设置为空字符串 `""`，API 会自动为新片段生成唯一 ID。如果提供一个当前系统中不存在的 ID，新片段也将使用该 ID 创建。
    -   `name` (string): **必填**。代码片段的名称。
    -   `type` (string): **必填**。代码片段的类型，必须是 `"js"` 或 `"css"`。
    -   `content` (string): **必填**。代码片段的实际内容（JavaScript 或 CSS 代码）。
    -   `enabled` (boolean): **必填**。设置代码片段是否启用 (`true` 表示启用, `false` 表示禁用)。

**请求示例 (设置两个代码片段，这将替换掉所有旧的片段):**

```json
{
  "snippets": [
    {
      "id": "", // 创建新片段，ID 留空，系统将生成新 ID
      "name": "My New Utility Functions",
      "type": "js",
      "content": "function helper() { console.log('Helper!'); }",
      "enabled": true
    },
    {
      "id": "custom-css-theme-tweaks", // 使用自定义 ID 创建或更新片段
      "name": "My Custom CSS Tweaks",
      "type": "css",
      "content": "body { background-color: #f0f0f0; }",
      "enabled": false
    }
  ]
}
```

**⚠️ 警告：再次强调，上述示例如果执行，您的代码片段库中将只剩下 "My New Utility Functions" 和 "My Custom CSS Tweaks" 这两个片段。所有之前的片段都将被删除。**

## 如何安全地更新或添加单个片段

由于此接口是全量替换，正确的更新/添加单个片段的流程如下：

1.  **获取当前所有片段**: 调用 `/api/snippet/getSnippet` (通常参数为 `{"type": "all", "enabled": 2}`) 获取所有已存在的代码片段列表。
2.  **在本地修改列表**:
    *   **更新现有片段**: 在获取到的列表中找到要更新的片段对象，修改其 `name`, `content`, `enabled` 等属性。
    *   **添加新片段**: 创建一个新的片段对象，并将其添加到列表中。确保为新片段提供空字符串 `""` 作为 `id` (由系统生成) 或一个唯一的自定义 `id`。
    *   **删除片段**: 从列表中移除不再需要的片段对象。
3.  **设置完整列表**: 将修改后的完整片段列表作为 `snippets` 数组，通过 `/api/snippet/setSnippet` 发送。

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如参数无效、保存失败等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "set snippet failed: invalid snippet type", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要创建或更新的代码片段信息进行在线测试。请确保 JSON 格式正确。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

