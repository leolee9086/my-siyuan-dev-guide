---
title: getHeadingChildrenDOM
---
# 端点

/api/block/getHeadingChildrenDOM

←

getHeadingChildrenDOM

⌂

## getHeadingChildrenDOM

`POST /api/block/getHeadingChildrenDOM`

获取指定标题块下的所有直接子块的 DOM 字符串表示。

这个接口将所有直接子块的 DOM 拼接成一个字符串返回，不包含标题块本身，也不会递归获取更深层级的子块。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标标题块的 ID。 |

**返回值**

成功时返回包含所有子块 DOM 的字符串：

```json
{
    "code": 0,
    "msg": "",
    "data": "<div data-node-id='子块ID_1'...>...</div><div data-node-id='子块ID_2'...>...</div>..."
}
```

如果标题块不存在或没有子块，\`data\` 字段会是一个空字符串 \`""\`。

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的标题块的子块 DOM：

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

