---
title: 追加块
---
# 端点

/api/block/appendBlock

# 追加块

需要认证

## 接口描述

该接口用于在一个指定的父块内容的末尾追加一个新的块。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/block\_op.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L361) (`appendBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| data | string | 是 | 要追加的块的内容。 |
| dataType | string | 是 | 数据类型，可选值为 'markdown' 或 'dom'。如果为 'markdown'，服务器会自动转换为 'dom'。 |
| parentID | string | 是 | 目标父块的 ID。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含执行的操作事务信息的对象。 |
| data.transactions | array | 事务数组。 |
| data.transactions\[\].doOperations | array | 执行的操作数组。 |
| data.transactions\[\].doOperations\[\].action | string | 操作类型，例如 "appendInsert"。 |
| data.transactions\[\].doOperations\[\].id | string | 新生成的块的 ID。 |
| data.transactions\[\].doOperations\[\].data | string | 新生成的块的 DOM 内容。 |
| data.transactions\[\].doOperations\[\].parentID | string | 父块 ID。 |

请求示例

返回示例

### 请求示例 (Markdown)

```json
{
  "data": "这是要追加的 Markdown 内容",
  "dataType": "markdown",
  "parentID": "20230517100000-ijklmnop"
}
```

### 请求示例 (DOM)

```json
{
  "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-uvwxyzab\">这是要追加的 DOM 内容</div>",
  "dataType": "dom",
  "parentID": "20230517100000-ijklmnop"
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "transactions": [
      {
        "doOperations": [
          {
            "action": "appendInsert",
            "id": "20230518100000-abcdefg1",
            "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-abcdefg1\">这是要追加的 Markdown 内容</div>",
            "parentID": "20230517100000-ijklmnop"
          }
        ]
      }
    ]
  }
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "Invalid block ID pattern [无效的父ID]",
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
