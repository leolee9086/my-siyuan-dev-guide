---
title: /api/block/deleteBlock
---
# 端点

/api/block/deleteBlock

# /api/block/deleteBlock

## 删除块

**方法:** POST

**认证:** Token (通过 Authorization 头或者 Cookie \_xsrf 传递)

-   [API 文档](../index.html)
-   [块 API](../pages/block.html)
-   [deleteBlock](#)
-   [查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L608)

## 接口描述

> 该接口用于删除指定 ID 的块。如果删除的是文档块，其关联的文件也会被放入回收站。

## 参数

| 参数 | 类型 | 位置 | 必需 | 描述 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| `id` | string | Body (JSON) | 是 | 要删除的块的 ID。 | \- |

## 响应

| 状态码 | 描述 | 响应体 |
| --- | --- | --- |
| `200 OK` | 成功 | 
```json
{
    "code": 0,
    "msg": "",
    "data": {
        "transactions": [
            {
                "doOperations": [
                    {
                        "action": "delete",
                        "id": "块ID"
                        // 其他操作相关的字段...
                    }
                ],
                // 其他事务相关的字段...
            }
        ]
    }
}
```

 |
| `400 Bad Request` | 请求错误（如 ID 无效或块不存在） | 

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [...] 或 Block not found [...]",
    "data": null
}
```

 |

## 示例

-   [请求示例](#request-example)
-   [成功响应示例](#response-example)
-   [cURL 示例](#curl-example)

### 请求体 (JSON)

```json
{
    "id": "20230517100000-abcdefgh"
}
```

### 响应体 (JSON)

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "transactions": [
            {
                "doOperations": [
                    {
                        "action": "delete",
                        "id": "20230517100000-abcdefgh",
                        "previousID": "20230517095900-uvwxyz01",
                        "parentID": "20230517095800-qwerty00",
                        "box": "20210810165618-q9n3dk0"
                    }
                ],
                "undoOperations": [
                    {
                        "action": "insert",
                        "id": "20230517100000-abcdefgh",
                        "previousID": "20230517095900-uvwxyz01",
                        "parentID": "20230517095800-qwerty00",
                        "data": "块内容...",
                        "markdown": "块内容...",
                        "dataType": "dom"
                    }
                ],
                "sessionID": "random-session-id"
            }
        ]
    }
}
```

### cURL

```bash
curl -X POST http://127.0.0.1:6806/api/block/deleteBlock \
     -H "Authorization: Token YOUR_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
           "id": "20230517100000-abcdefgh"
         }'
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

© 2024 Siyuan API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
