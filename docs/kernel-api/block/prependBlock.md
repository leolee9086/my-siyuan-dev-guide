---
title: 前置追加块 API (`/api/block/prependBlock`)
---
# 端点

/api/block/prependBlock

# 前置追加块 API (\`/api/block/prependBlock\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L409) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于在一个指定的父块内容的**开头**插入一个新的块。

## 请求

**方法:** POST

**路径:** \`/api/block/prependBlock\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`data\` | string | 是 | 要插入的块的内容。 |
| \`dataType\` | string | 是 | 数据类型，可选值为 'markdown' 或 'dom'。如果为 'markdown'，服务器会自动转换为 'dom'。 |
| \`parentID\` | string | 是 | 目标父块的 ID。 |

### 请求示例

```json
{
    "data": "这是要前置插入的 Markdown 内容",
    "dataType": "markdown",
    "parentID": "20230517100000-ijklmnop"
}
```

```json
{
    "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-cdefghij\">这是要前置插入的 DOM 内容</div>",
    "dataType": "dom",
    "parentID": "20230517100000-ijklmnop"
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
                        "action": "prependInsert",
                        "id": "20230518100000-cdefghij", // 新生成的块 ID
                        "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-cdefghij\">这是要前置插入的 Markdown 内容</div>",
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

如果请求失败（例如，\`parentID\` 无效，\`dataType\` 为 'markdown' 但转换失败），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [无效的父ID]", // 或 "data block DOM failed: ..."
    "data": null
}
```

## 在线测试

data (必填):

dataType (必填): markdown dom

parentID (必填): 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
