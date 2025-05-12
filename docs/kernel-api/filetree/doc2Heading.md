---
title: 文档转换为标题
---
# 端点

/api/filetree/doc2Heading

[← 返回 FileTree API 列表](../pages/filetree.html)

# 文档转换为标题

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L180)

`POST /api/filetree/doc2Heading`

## 描述

将一个文档转换为另一个文档中的标题。这个 API 允许用户重新组织文档结构，将独立的文档合并到另一个文档中，成为其中的一个标题（章节）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `srcID` | `string` | 源文档 ID，将被转换为标题的文档 | 是 |
| `targetID` | `string` | 目标文档 ID，源文档将成为此文档中的一个标题 | 是 |
| `after` | `boolean` | 位置控制，true 表示插入到目标文档的末尾，false 表示插入到开头 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含操作后的文档路径信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "srcTreeBox": "20200812220555-lj3enxa",  // 源文档所在的笔记本 ID
    "srcTreePath": "/path/to/doc.sy"        // 源文档的路径
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
