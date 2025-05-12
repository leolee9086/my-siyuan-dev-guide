---
title: appendDailyNoteBlock
---
# 端点

/api/block/appendDailyNoteBlock

# appendDailyNoteBlock

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go "查看源文件")

需要认证 需要管理员权限 需要写权限

## 接口描述

将指定的内容块（可以是 Markdown 或 DOM 字符串）追加到指定笔记本的当日日记文档的末尾。如果当日日记文档不存在，将自动创建。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 目标笔记本的 ID。 |
| data | string | 是 | 要追加的内容块数据。 |
| dataType | string | 是 | \`data\` 参数的数据类型，必须是 \`"markdown"\` 或 \`"dom"\`。 |

## 返回值

成功时返回一个包含执行的操作事务的对象数组。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，-1 表示失败 |
| msg | string | 返回信息，成功时为空 |
| data | array (object) | 包含事务信息的数组。每个事务对象包含 \`doOperations\` 数组，其中描述了具体的操作（如 \`appendInsert\`）、操作数据和目标父块 ID（日记文档 ID）。 |

请求示例

返回示例 (成功)

### 请求示例 (追加 Markdown)

```
POST /api/block/appendDailyNoteBlock
Content-Type: application/json
Authorization: Token your-api-token

{
  "notebook": "20200812220555-lj3enxa",
  "dataType": "markdown",
  "data": "* 这是追加的列表项"
}
```

### 请求示例 (追加 DOM)

```
POST /api/block/appendDailyNoteBlock
Content-Type: application/json
Authorization: Token your-api-token

{
  "notebook": "20200812220555-lj3enxa",
  "dataType": "dom",
  "data": "<p data-node-id='20240...' data-type='NodeParagraph'>这是追加的段落 DOM</p>"
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "doOperations": [
        {
          "action": "appendInsert",
          "parentID": "20240315103000-abcdef12", // 当日日记文档 ID
          "data": "<ul data-node-id='...' ...><li data-node-id='...' ...>这是追加的列表项</li></ul>", // 转换后的 DOM
          // 其他操作细节...
        }
      ]
      // 其他事务信息...
    }
  ]
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
