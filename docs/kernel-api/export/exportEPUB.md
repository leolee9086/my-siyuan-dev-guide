---
title: 导出为 EPUB
---
# 端点

/api/export/exportEPUB

[← 返回 Export API 列表](../pages/export.html)

# 导出为 EPUB

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L55)

`POST /api/export/exportEPUB`

## 描述

将指定的文档块（ID）通过 Pandoc 转换为 EPUB 格式电子书，并打包为 ZIP 文件。需要系统安装 Pandoc。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要导出的文档块 ID。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含导出的 EPUB 文件（包含在 ZIP 内）的信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "document_title.epub", // 导出的 EPUB 文件名
    "zip": "/temp/export/xxx.zip"   // 包含 EPUB 的 ZIP 文件相对路径
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
