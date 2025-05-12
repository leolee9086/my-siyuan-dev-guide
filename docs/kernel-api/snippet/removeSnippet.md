---
title: 删除代码片段 (removeSnippet)
---
# 端点

/api/snippet/removeSnippet

# 删除代码片段 (removeSnippet)

[首页](../index.html) | [Snippet API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/snippet.go#L118)

## 功能描述

此 API 端点 `POST /api/snippet/removeSnippet` 用于删除一个指定的代码片段 (Snippet)。

删除操作是永久性的，请谨慎使用。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。要删除的代码片段的唯一 ID。

**请求示例:**

```json
{
  "id": "20230115100000-abcdefg"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0。与许多删除操作不同，此 API 的 `data` 字段会包含**被成功删除的代码片段对象**。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20230115100000-abcdefg", // 被删除片段的 ID
    "name": "My Custom CSS",       // 被删除片段的名称
    "type": "css",                // 被删除片段的类型
    "content": "body { font-family: sans-serif; }", // 被删除片段的内容
    "enabled": true               // 被删除片段的启用状态
  }
}
```

如果操作失败（例如 ID 不存在、无权限等），将返回非 0 的 `code` 和具体的错误信息 `msg`，此时 `data` 为 `null`。

```json
{
  "code": -1,
  "msg": "remove snippet failed: snippet not found", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要删除的代码片段 ID 进行在线测试。**请注意：此操作将永久删除指定的代码片段，请谨慎操作！**

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

