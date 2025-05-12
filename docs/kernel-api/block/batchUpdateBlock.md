---
title: 批量更新块
---
# 端点

/api/block/batchUpdateBlock

# 批量更新块

需要认证

## 接口描述

此接口用于在一个原子事务中批量更新多个块的内容。

这对于需要同时修改多个块并确保它们要么全部成功、要么全部失败的场景非常有用。

API 会将所有指定的更新操作打包成一个事务执行，执行后会强制刷新数据库队列，并通过 WebSocket 广播变更。

**注意：** 更新文档块（\`NodeDocument\`）时，此 API 会先删除文档内所有现有块，然后将新内容追加进去，行为与更新普通块不同。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/block\_op.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L22) (`batchUpdateBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| blocks | array | 是 | 包含多个块更新信息的对象数组。 |
| blocks\[\].id | string | 是 | 要更新的块的 ID。 |
| blocks\[\].data | string | 是 | 块的新内容。 |
| blocks\[\].dataType | string | 是 | \`data\` 的格式，必须是 \`"markdown"\` 或 \`"dom"\`。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | array | 包含执行的操作事务信息的数组（通常只包含一个事务）。 |
| data\[\].doOperations | array | 执行的操作数组。 |
| data\[\].doOperations\[\].action | string | 操作类型，例如 "update"。 |
| data\[\].doOperations\[\].id | string | 被更新的块的 ID。 |
| data\[\].doOperations\[\].data | string | 处理后的 DOM 内容。 |
| data\[\].undoOperations | array | 对应的撤销操作数组。 |
| data\[\].timestamp | number | 事务的时间戳 (毫秒)。 |

请求示例

返回示例

### 请求示例

```json
{
  "blocks": [
    {
      "id": "20230315180000-abcdefg",
      "data": "这是块 1 的新 Markdown 内容",
      "dataType": "markdown"
    },
    {
      "id": "20230315180100-hijklmn",
      "data": "<div data-type=\"NodeParagraph\" class=\"p\"><div contenteditable=\"true\">这是块 2 的新 DOM 内容</div></div>",
      "dataType": "dom"
    }
  ]
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "doOperations": [
        {
          "action": "update",
          "id": "20230315180000-abcdefg",
          "data": "<div data-node-id=\"20230315180000-abcdefg\" ...>...</div>"
        },
        {
          "action": "update",
          "id": "20230315180100-hijklmn",
          "data": "<div data-node-id=\"20230315180100-hijklmn\" ...>...</div>"
        }
      ],
      "undoOperations": [
        // ... 对应的撤销操作
      ],
      "timestamp": 1678886400000
    }
  ]
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "parse tree failed",
  "data": null
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
