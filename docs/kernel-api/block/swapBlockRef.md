---
title: 交换块引用与定义
---
# 端点

/api/block/swapBlockRef

[← 返回 Block API 列表](../pages/block.html)

# 交换块引用与定义

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L106)

`POST /api/block/swapBlockRef`

## 描述

交换一个块引用（Ref）和其对应的定义块（Def）的内容。可以选择是否包含子块一起交换。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `refID` | `string` | 块引用的 ID。 | 是 |
| `defID` | `string` | 对应的定义块 ID。 | 是 |
| `includeChildren` | `boolean` | 是否包含子块一起交换。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功，非 0 表示失败。成功时 `data` 为 null。

```json
{
  "code": 0,
  "msg": "",
  "data": null
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
