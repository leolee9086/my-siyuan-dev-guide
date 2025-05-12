---
title: moveOutlineHeading
---
# 端点

/api/block/moveOutlineHeading

←

moveOutlineHeading

⌂

## moveOutlineHeading

`POST /api/block/moveOutlineHeading`

移动文档大纲中的标题块（Heading Block）到指定的位置。

这允许你改变标题的层级或调整同级标题的顺序。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。要移动的标题块的 ID。 |
| `parentID` | `string` | 可选。新的父块 ID。可以是另一个标题块的 ID 或文档根块的 ID。如果省略或为空字符串，则将标题移动到文档的顶层。 |
| `previousID` | `string` | 可选。目标位置的前一个块的 ID。移动的标题块将被放置在此块之后。如果省略或为空字符串，则将其放置在指定 \`parentID\` 下的第一个位置（如果 \`parentID\` 也为空，则放在文档的开头）。 |

**返回值**

成功时返回包含移动操作事务的数组：

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "doOperations": [
                {
                    "action": "moveOutlineHeading",
                    "id": "移动的标题块ID",
                    "previousID": "目标位置前一个块ID或空",
                    "parentID": "新父块ID或空",
                    "retData": "所属文档根块ID"
                }
            ],
            "undoOperations": [ /* 撤销操作 */ ]
        }
    ]
}
```

失败时（例如 ID 无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "invalid block id [id=无效ID]",
    "data": null
}
```

**请求示例**

1\. 将标题 \`2023...h1\` 移动到标题 \`2023...p1\` 的下方（作为其子标题），并成为第一个子标题：

```json
{
    "id": "2023...h1",
    "parentID": "2023...p1",
    "previousID": ""
}
```

2\. 将标题 \`2023...h2\` 移动到同级标题 \`2023...h3\` 的前面（调整顺序）：

```json
{
    "id": "2023...h2",
    "parentID": "文档根块ID或其父标题ID", // 保持原来的父级
    "previousID": "2023...h3 之前的那个块的ID" // 如果 h3 是第一个，这里为空
}
```

3\. 将标题 \`2023...h4\` 移动到文档顶层，成为第一个标题：

```json
{
    "id": "2023...h4",
    "parentID": "文档根块ID",
    "previousID": ""
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

