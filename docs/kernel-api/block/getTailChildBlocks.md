---
title: getTailChildBlocks
---
# 端点

/api/block/getTailChildBlocks

←

getTailChildBlocks

⌂

## getTailChildBlocks

`POST /api/block/getTailChildBlocks`

获取指定父块末尾指定数量的子块信息。

这常用于在大文档或长列表中，只加载最后一部分内容以提高性能。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标父块的 ID。 |
| `n` | `integer` | 可选。要获取的末尾子块的数量。如果省略或小于 1，默认为 7。 |

**返回值**

成功时返回包含末尾子块信息的对象数组：

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "id": "末尾子块ID_N-k+1",
            "type": "块类型",
            "content": "内容摘要",
            // ... 其他块信息
        },
        // ... 最多 n 个块
        {
            "id": "末尾子块ID_N",
            "type": "块类型",
            "content": "内容摘要",
            // ...
        }
    ]
}
```

如果父块不存在或没有子块，\`data\` 字段会是一个空数组 \`\[\]\`。

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的块末尾 5 个子块的信息：

```json
{
    "id": "20230101120000-abcdefgh",
    "n": 5
}
```

获取 ID 为 \`20230101...\` 的块末尾默认数量（7个）的子块信息：

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

