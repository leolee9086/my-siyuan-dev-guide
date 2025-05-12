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

