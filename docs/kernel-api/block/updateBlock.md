---
title: 更新块 API (`/api/block/updateBlock`)
---
# 端点

/api/block/updateBlock

# 更新块 API (\`/api/block/updateBlock\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L517) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于更新指定 ID 的块的内容。

**注意:**

-   如果更新的是文档块（\`NodeDocument\` 类型），则其所有子块会被删除，然后将新内容追加进去。
-   如果更新的是列表项（\`NodeListItem\` 类型），并且提供的数据是列表 (\`NodeList\`)，会进行特殊处理以避免渲染错误 (GitHub issue #4658)。

## 请求

**方法:** POST

**路径:** \`/api/block/updateBlock\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`id\` | string | 是 | 要更新的块的 ID。 |
| \`data\` | string | 是 | 新的块内容。 |
| \`dataType\` | string | 是 | 数据类型，可选值为 'markdown' 或 'dom'。如果为 'markdown'，服务器会自动转换为 'dom'。 |

### 请求示例

使用 Markdown 更新:

```json
{
    "id": "20230517100000-abcdefgh",
    "data": "这是更新后的 Markdown 内容",
    "dataType": "markdown"
}
```

使用 DOM 更新:

```json
{
    "id": "20230517100000-ijklmnop",
    "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230517100000-ijklmnop\">这是更新后的 DOM 内容</div>",
    "dataType": "dom"
}
```

## 响应

### 成功响应 (200 OK)

成功时，返回一个包含执行的操作事务信息的对象。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "transactions": [
            {
                "doOperations": [
                    {
                        "action": "update", // 或 "delete" + "appendInsert" (更新文档块时)
                        "id": "20230517100000-abcdefgh",
                        "data": "<div ...>更新后的 DOM 内容</div>" // 更新后的 DOM
                        // 其他操作相关的字段...
                    }
                ],
                // 其他事务相关的字段...
            }
        ]
    }
}
```

### 失败响应

如果请求失败（例如，ID 无效，\`dataType\` 为 'markdown' 但转换失败，或解析 DOM 失败），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [无效的ID]", // 或 "get block failed: ...", "data block DOM failed: ...", "parse tree failed"
    "data": null
}
```

## 在线测试

id (必填): 

data (必填):

dataType (必填): markdown dom

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

