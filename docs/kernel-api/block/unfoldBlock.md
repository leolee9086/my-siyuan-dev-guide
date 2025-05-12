---
title: unfoldBlock
---
# 端点

/api/block/unfoldBlock

←

unfoldBlock

⌂

## unfoldBlock

`POST /api/block/unfoldBlock`

展开指定的块（解除折叠状态）。

这通常用于显示之前被折叠的块的内容。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。要展开的块的 ID。 |

**返回值**

成功时返回空数据：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

失败时（例如 ID 无效或块不存在）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "invalid block id [id=无效ID]", // 或 "get block [id=不存在ID] failed: block not found"
    "data": null
}
```

**请求示例**

```json
{
    "id": "要展开的块的ID"
}
```

## 在线测试

服务器地址:

API Token: 

API 路径: 

请求方法: 

请求体:

发送请求

响应结果:

[查看源代码 (block\_op.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go) | [返回 Block API 列表](../pages/block.html) | [返回 API 首页](../index.html)

© 2024 Siyuan Note API Documentation

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
