---
title: 导出临时内容为 HTML
---
# 端点

/api/export/exportTempContent

[← 返回 Export API 列表](../pages/export.html)

# 导出临时内容为 HTML

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L446)

`POST /api/export/exportTempContent`

## 描述

将传入的 Markdown 内容（非持久化）渲染为带样式的 HTML 文件，并打包为 ZIP。这允许在不创建实际文档块的情况下，预览 Markdown 导出效果。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `markdown` | `string` | 要导出的 Markdown 文本内容。 | 是 |
| `title` | `string` | 导出的 HTML 文件标题。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含导出的 ZIP 文件信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/temp/export/xxx.zip" // 导出的 ZIP 文件相对路径
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
