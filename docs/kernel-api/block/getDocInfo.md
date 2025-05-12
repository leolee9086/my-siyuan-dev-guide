---
title: 获取文档信息
---
# 端点

/api/block/getDocInfo

[← 返回 Block API 列表](../pages/block.html)

# 获取文档信息

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L262)

`POST /api/block/getDocInfo`

## 描述

获取指定 ID 所属的文档块的基本信息，包括文档本身的 ID、所属笔记本 ID、名称和路径等。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 文档内任意块的 ID。系统会根据此 ID 向上查找，定位到所属的文档块。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含文档块的信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20230101120000-docid", // 文档块 ID
    "box": "notebook-id",       // 笔记本 ID
    "name": "文档标题",          // 文档名
    "path": "/path/to/document" // 文档路径
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
