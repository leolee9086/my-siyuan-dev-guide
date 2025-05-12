---
title: 创建/更新代码片段 (setSnippet)
---
# 端点

/api/snippet/setSnippet

# 创建/更新代码片段 (setSnippet)

[首页](../index.html) | [Snippet API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/snippet.go#L78)

## 功能描述

此 API 端点 `POST /api/snippet/setSnippet` 用于创建新的代码片段 (Snippet) 或更新已有的代码片段。

可以通过在请求中提供一个包含代码片段对象的数组，来批量创建或更新多个片段。

## 请求参数

请求体必须是 JSON 格式，包含一个名为 `snippets` 的数组：

-   `snippets` (array of objects): **必填**。包含一个或多个代码片段对象的数组。每个对象应包含以下字段：
    -   `id` (string): 片段的唯一 ID。
        -   **更新现有片段**：提供要更新片段的准确 ID。
        -   **创建新片段**：将此字段设置为空字符串 `""`。API 会自动为新片段生成唯一 ID。
    -   `name` (string): **必填**。代码片段的名称。
    -   `type` (string): **必填**。代码片段的类型，必须是 `"js"` 或 `"css"`。
    -   `content` (string): **必填**。代码片段的实际内容（JavaScript 或 CSS 代码）。
    -   `enabled` (boolean): **必填**。设置代码片段是否启用 (`true` 表示启用, `false` 表示禁用)。

**请求示例 (创建一个新的 JS 片段并更新一个现有的 CSS 片段):**

```json
{
  "snippets": [
    {
      "id": "", // 创建新片段，ID 留空
      "name": "My New Utility Functions",
      "type": "js",
      "content": "function helper() { console.log('Helper!'); }",
      "enabled": true
    },
    {
      "id": "20230115100000-abcdefg", // 更新现有片段，提供 ID
      "name": "My Updated Custom CSS",
      "type": "css",
      "content": "body { background-color: #f0f0f0; }", // 新内容
      "enabled": false // 更新为禁用
    }
  ]
}
```

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

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
