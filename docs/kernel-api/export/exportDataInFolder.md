---
title: 导出指定文件夹中的数据
---
# 端点

/api/export/exportDataInFolder

[← 返回 Export API 列表](../pages/export.html)

# 导出指定文件夹中的数据

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/export.go#L220)

`POST /api/export/exportDataInFolder`

## 描述

将指定的本地文件夹路径下的数据打包为 ZIP 文件进行导出。**注意：** 此接口通常用于导出工作空间外部的数据，需要提供完整的本地路径。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `folder` | `string` | 要导出的本地文件夹的绝对路径。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功，非 0 表示失败（例如文件夹不存在或无权限）。`data` 包含导出的 ZIP 文件名。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "folder_name.zip" // 基于文件夹名称的 ZIP 文件名
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
