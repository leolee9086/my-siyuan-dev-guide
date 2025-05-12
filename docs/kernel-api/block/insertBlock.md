---
title: 插入块 API (`/api/block/insertBlock`)
---
# 端点

/api/block/insertBlock

# 插入块 API (\`/api/block/insertBlock\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L451) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于在指定的位置插入一个新的块。可以通过提供 \`parentID\`、\`previousID\` 或 \`nextID\` 来精确控制插入点。

**注意:** 至少需要提供 \`parentID\`、\`previousID\` 或 \`nextID\` 中的一个来确定插入位置。

## 请求

**方法:** POST

**路径:** \`/api/block/insertBlock\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`data\` | string | 是 | 要插入的块的内容。 |
| \`dataType\` | string | 是 | 数据类型，可选值为 'markdown' 或 'dom'。如果为 'markdown'，服务器会自动转换为 'dom'。 |
| \`parentID\` | string | 否 | 目标父块的 ID。如果同时指定了 \`previousID\` 或 \`nextID\`，则优先使用后两者确定位置。如果只指定 \`parentID\`，则默认追加到该父块的末尾。 |
| \`previousID\` | string | 否 | 目标位置的前一个兄弟块的 ID。新块将插入到此块之后。 |
| \`nextID\` | string | 否 | 目标位置的后一个兄弟块的 ID。新块将插入到此块之前。如果同时指定了 \`previousID\`，则优先使用 \`previousID\`。 |

### 请求示例

1\. 插入到 \`previousID\` 之后:

```json
{
    "data": "要插入的内容",
    "dataType": "markdown",
    "previousID": "20230517100000-abcdefgh"
}
```

2\. 插入到 \`nextID\` 之前:

```json
{
    "data": "要插入的内容",
    "dataType": "markdown",
    "nextID": "20230517100000-ijklmnop"
}
```

3\. 插入到 \`parentID\` 的末尾:

```json
{
    "data": "要插入的内容",
    "dataType": "markdown",
    "parentID": "20230517100000-qrstuvwx"
}
```

4\. 插入到 \`parentID\` 的开头 (通过指定第一个子块为 nextID):

```json
{
    "data": "要插入的内容",
    "dataType": "markdown",
    "parentID": "20230517100000-qrstuvwx",
    "nextID": "父块下的第一个子块ID"
}
```

## 响应

### 成功响应 (200 OK)

成功时，返回一个包含执行的操作事务信息的对象。新的块 ID 会在 \`doOperations\` 中返回。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "transactions": [
            {
                "doOperations": [
                    {
                        "action": "insert",
                        "id": "20230518100000-efghijkl", // 新生成的块 ID
                        "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-efghijkl\">要插入的内容</div>",
                        "parentID": "推断出的父块ID",
                        "previousID": "推断出的前一个块ID",
                        "nextID": "推断出的后一个块ID"
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

如果请求失败（例如，ID 无效，无法确定插入位置，\`dataType\` 为 'markdown' 但转换失败），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [无效的ID]", // 或 "data block DOM failed: ..." 或其他错误
    "data": null
}
```

## 在线测试

data (必填):

dataType (必填): markdown dom

parentID: 

previousID: 

nextID: 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

