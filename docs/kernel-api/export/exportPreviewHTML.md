---
title: 导出预览 HTML
---
# 端点

/api/export/exportPreviewHTML

[← 返回 Export API 列表](../pages/export.html)

# 导出预览 HTML

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L476)

`POST /api/export/exportPreviewHTML`

## 描述

将指定的文档块（ID）导出为带样式的预览 HTML 文件，并打包为 ZIP。HTML 文件会尽量模拟思源笔记编辑器的预览效果。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要导出的文档块 ID。 | 是 |
| `pdf` | `boolean` | 是否为生成 PDF 进行优化（例如移除某些交互元素）。 | 是 |
| `keepFold` | `boolean` | 是否在导出的 HTML 中保持块的折叠状态。 | 是 |

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
