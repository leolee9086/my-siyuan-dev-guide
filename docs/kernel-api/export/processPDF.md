---
title: 处理 PDF 导出
---
# 端点

/api/export/processPDF

[← 返回 Export API 列表](../pages/export.html)

# 处理 PDF 导出

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go)

`POST /api/export/processPDF`

## 描述

处理导出的 PDF 文件，执行后处理操作，如添加水印、页眉页脚等。此 API 通常在 PDF 导出流程中由系统内部调用，完善 PDF 输出的格式和功能。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `path` | `string` | 需要处理的 PDF 文件路径 | 是 |
| `id` | `string` | 关联的文档块 ID | 是 |
| `options` | `object` | PDF 处理选项，如页眉页脚、水印等设置 | 否 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含处理后的 PDF 文件信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/temp/export/processed-xxx.pdf" // 处理后的 PDF 文件路径
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
