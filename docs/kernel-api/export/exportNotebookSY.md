---
title: 导出笔记本为 .sy 包
---
# 端点

/api/export/exportNotebookSY

[← 返回 Export API 列表](../pages/export.html)

# 导出笔记本为 .sy 包

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L344)

`POST /api/export/exportNotebookSY`

## 描述

将指定的笔记本导出为思源笔记的标准 \`.sy\` 格式数据包（实质上是一个 ZIP 文件）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要导出的笔记本 ID。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含导出的 \`.sy\` 包的信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/temp/export/notebook_name.sy", // 导出的 .sy 包相对路径
    "name": "notebook_name.sy"             // 导出的 .sy 包文件名
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
