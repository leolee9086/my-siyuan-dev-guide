---
title: getHeadingChildrenIDs
---
# 端点

/api/block/getHeadingChildrenIDs

←

getHeadingChildrenIDs

⌂

## getHeadingChildrenIDs

`POST /api/block/getHeadingChildrenIDs`

获取指定标题块下的所有直接子块的 ID 列表。

这个接口只返回直接子块的 ID，不会递归查询更深层级的子块。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标标题块的 ID。 |

**返回值**

成功时返回包含子块 ID 的字符串数组：

```json
{
    "code": 0,
    "msg": "",
    "data": [
        "子块ID_1",
        "子块ID_2",
        // ...
    ]
}
```

如果标题块不存在或没有子块，\`data\` 字段会是一个空数组 \`\[\]\`。

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的标题块的子块 ID：

```json
{
    "id": "20230101120000-abcdefgh"
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

[查看源代码 (block.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go) | [查看模型代码 (model/block.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/block.go) | [返回 Block API 列表](../pages/block.html) | [返回 API 首页](../index.html)

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
