---
title: 导出为文件
---
# 端点

/api/export/exportAsFile

[← 返回 Export API 列表](../pages/export.html)

# 导出为文件

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L590)

`POST /api/export/exportAsFile`

## 描述

将指定的文档块（ID）导出为单个文件。可以选择不同的导出格式（Markdown 或 HTML）以及是否包含某些元素（例如属性、书签、ID等）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要导出的文档块 ID。 | 是 |
| `type` | `string` | 导出类型："md" (Markdown) 或 "html" (HTML)。 | 是 |
| `keepFold` | `boolean` | 是否保持内容块的折叠状态（导出折叠标记）。 | 是 |
| `removeAssets` | `boolean` | 是否移除资源文件引用（例如图片链接）。 | 是 |
| `keepID` | `boolean` | 是否保留块 ID。 | 是 |
| `keepAttrs` | `boolean` | 是否保留块属性。 | 是 |
| `keepBookmark` | `boolean` | 是否保留书签标记。 | 是 |
| `keepEmbed` | `boolean` | 是否保留嵌入块。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含导出文件的信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/temp/export/xxx.md", // 导出的文件相对路径
    "name": "xxx.md"              // 导出的文件名
  }
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
