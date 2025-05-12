---
title: 获取块兄弟节点 ID
---
# 端点

/api/block/getBlockSiblingID

[← 返回 Block API 列表](../pages/block.html)

# 获取块兄弟节点 ID

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L50)

`POST /api/block/getBlockSiblingID`

## 描述

获取指定块的父块、上一个兄弟块和下一个兄弟块的 ID。如果不存在对应的块（例如，第一个块没有上一个兄弟），则对应的 ID 字段为空字符串。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 目标块 ID。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含相关块的 ID。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "parent": "20230101120000-parentid", // 父块 ID
    "previous": "", // 上一个兄弟块 ID (如果存在)
    "next": "20230101120000-nextid" // 下一个兄弟块 ID (如果存在)
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
