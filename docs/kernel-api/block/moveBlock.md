---
title: 移动块 API (`/api/block/moveBlock`)
---
# 端点

/api/block/moveBlock

# 移动块 API (\`/api/block/moveBlock\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L309) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于移动一个块到新的位置。可以通过指定新的父块和/或前一个兄弟块来确定新位置。

## 请求

**方法:** POST

**路径:** \`/api/block/moveBlock\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`id\` | string | 是 | 要移动的块的 ID。 |
| \`parentID\` | string | 否 | 新的父块 ID。如果指定，块将被移动到此父块的子节点中。如果未指定 \`previousID\`，则默认添加到末尾。 |
| \`previousID\` | string | 否 | 新的前一个兄弟块 ID。块将被移动到该块之后。**注意：** \`previousID\` 不能是文档块的 ID。 |

### 请求示例

```json
{
    "id": "20230517100000-abcdefgh",
    "parentID": "20230517100000-ijklmnop",
    "previousID": "20230517100000-qrstuvwx"
}
```

```json
{
    "id": "20230517100000-abcdefgh",
    "parentID": "20230517100000-ijklmnop" // 移动到 parentID 末尾
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
                        "action": "move",
                        "id": "20230517100000-abcdefgh",
                        "previousID": "20230517100000-qrstuvwx",
                        "parentID": "20230517100000-ijklmnop"
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

如果请求失败（例如，ID 无效，\`previousID\` 是文档块），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [无效的ID]", // 或 "`previousID` can not be the ID of a document"
    "data": null
}
```

## 在线测试

id (必填): 

parentID: 

previousID: 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

