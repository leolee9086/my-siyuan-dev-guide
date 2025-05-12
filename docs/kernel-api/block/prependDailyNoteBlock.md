---
title: prependDailyNoteBlock
---
# 端点

/api/block/prependDailyNoteBlock

←

prependDailyNoteBlock

⌂

## prependDailyNoteBlock

`POST /api/block/prependDailyNoteBlock`

在指定笔记本的日记开头插入块。

如果日记不存在，将会自动创建日记。

鉴权：需要管理员角色 `admin` 和写权限 `w`。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `notebook` | `string` | 必需。笔记本 ID |
| `data` | `string` | 必需。要插入的数据块，可以是 Markdown 或 DOM 字符串 |
| `dataType` | `string` | 必需。数据类型，必须是 `"markdown"` 或 `"dom"` |

**返回值**

成功时：

```json
{
    "code": 0,
    "msg": "",
    "data": [ // 返回事务对象数组
        {
            "doOperations": [
                {
                    "action": "prependInsert", // 操作类型为前插
                    "data": "<div data-type="NodeParagraph" data-node-id="20240801100000-abcdefgh" updated="20240801100000"><div contenteditable="true" spellcheck="false">这是日记开头插入的段落</div></div>",
                    "parentID": "20240801100000-xxxxxxx" // 日记文档块 ID
                }
            ],
            "undoOperations": [
                {
                    "action": "delete",
                    "id": "20240801100000-abcdefgh" // 新插入块的 ID
                }
            ]
        }
    ]
}
```

失败时：

```json
{
    "code": -1,
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

使用 Markdown 插入：

```json
{
    "notebook": "20200812220555-l1rk1xa",
    "dataType": "markdown",
    "data": "这是日记开头插入的段落"
}
```

使用 DOM 字符串插入：

```json
{
    "notebook": "20200812220555-l1rk1xa",
    "dataType": "dom",
    "data": "<div data-type="NodeParagraph" data-node-id="20240801100000-abcdefgh" updated="20240801100000"><div contenteditable="true" spellcheck="false">这是日记开头插入的段落</div></div>"
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

[查看源代码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go) | [返回 Block API 列表](../pages/block.html) | [返回 API 首页](../index.html)

© 2024 Siyuan Note API Documentation

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
