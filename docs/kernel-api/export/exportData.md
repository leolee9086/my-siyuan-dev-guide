---
title: 导出工作空间数据
---
# 端点

/api/export/exportData

[← 返回 Export API 列表](../pages/export.html)

# 导出工作空间数据

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L252)

`POST /api/export/exportData`

## 描述

将当前整个工作空间的数据（包括所有笔记本、文档、资源等）导出为一个 ZIP 压缩文件。

## 请求参数

此接口不需要请求参数。

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含导出的 ZIP 文件名。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "siyuan-data-xxx.zip" // 导出的 ZIP 文件名
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
