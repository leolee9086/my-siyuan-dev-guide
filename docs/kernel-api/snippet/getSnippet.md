---
title: 获取代码片段 (getSnippet)
---
# 端点

/api/snippet/getSnippet

# 获取代码片段 (getSnippet)

[首页](../index.html) | [Snippet API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/snippet.go#L26)

## 功能描述

此 API 端点 `POST /api/snippet/getSnippet` 用于获取已保存的代码片段 (Snippets) 列表。

可以根据代码片段的类型（JavaScript 或 CSS）、启用状态以及关键字进行过滤。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `type` (string): **必填**。要获取的代码片段类型。
    -   `"js"`: 仅获取 JavaScript 代码片段。
    -   `"css"`: 仅获取 CSS 代码片段。
    -   `"all"`: 获取所有类型的代码片段。
-   `enabled` (integer): **必填**。根据启用状态进行过滤。
    -   `0`: 仅获取已禁用的代码片段。
    -   `1`: 仅获取已启用的代码片段。
    -   `2`: 获取所有状态的代码片段（启用和禁用）。
-   `keyword` (string): _可选_。用于搜索的关键字。API 会在代码片段的名称 (`name`) 和内容 (`content`) 中查找此关键字（不区分大小写）。如果省略或为空字符串，则不进行关键字过滤。

**请求示例 (获取所有启用的 CSS 片段):**

```json
{
  "type": "css",
  "enabled": 1
}
```

**请求示例 (获取所有类型的片段，无论启用状态，且名称或内容包含 "theme"):**

```json
{
  "type": "all",
  "enabled": 2,
  "keyword": "theme"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 包含一个名为 `snippets` 的数组。

`snippets` 数组包含符合过滤条件的的代码片段对象。每个对象具有以下结构：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "snippets": [
      {
        "id": "20230115100000-abcdefg", // 片段的唯一 ID
        "name": "My Custom CSS",       // 片段名称
        "type": "css",                // 片段类型 ("js" or "css")
        "content": "body { font-family: sans-serif; }", // 片段内容
        "enabled": true               // 是否启用 (true or false)
      },
      // ... more snippet objects
    ]
  }
}
```

如果加载或处理过程中发生错误，将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "load snippets failed: error message", // 示例错误信息
  "data": null
}
```

如果没有找到符合条件的片段，`snippets` 数组将为空 `[]`。

## 在线测试

您可以在下方输入参数进行在线测试。

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
