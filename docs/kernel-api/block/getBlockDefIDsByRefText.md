---
title: 通过引用文本获取定义块 ID
---
# 端点

/api/block/getBlockDefIDsByRefText

[← 返回 Block API 列表](../pages/block.html)

# 通过引用文本获取定义块 ID

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L413)

`POST /api/block/getBlockDefIDsByRefText`

## 描述

根据给定的引用文本（通常是块引标记的内容），查找并返回所有对应的定义块的 ID 列表。可以指定笔记本 ID 来限制搜索范围。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `refText` | `string` | 要查找的引用文本。 | 是 |
| `notebookID` | `string` | 要搜索的笔记本 ID。如果省略，则在所有笔记本中搜索。 | 否 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 是一个包含找到的定义块 ID 的字符串数组。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    "20230101120000-abcdefgh",
    "20230102120000-ijklmnop"
    // ... more block IDs
  ]
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
