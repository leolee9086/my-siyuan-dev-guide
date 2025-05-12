---
title: 导出笔记本为 Markdown (exportNotebookMd)
---
# 端点

/api/export/exportNotebookMd

## 接口描述

本接口用于将指定 ID 的整个笔记本导出为一系列 Markdown 文件，并将这些文件及其相关资源（如图片）打包成一个 ZIP 压缩文件。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `notebook` | string | 是 | 需要导出的笔记本的 ID。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含导出的 ZIP 文件信息：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 导出的 ZIP 压缩包的文件名 (例如：`MyNotebook.zip`)。 |
| `zip` | string | 导出的 ZIP 压缩包在服务器上的临时路径。 |

如果发生错误，响应体的 `code` 字段将为非 0 值，`msg` 字段将包含错误信息。

## 请求示例

```json
{
  "notebook": "20200812223209-gtylnr2"
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "笔记本标题.zip",
    "zip": "/temp/export/笔记本标题-20230509110500.zip"
  }
}
```

失败响应（示例）：

```json
{
  "code": 1,
  "msg": "Notebook not found or export failed.",
  "data": null
}
```

## 错误码

-   `0`: 成功
-   其他非零值: 失败，具体错误信息请参考 `msg` 字段。例如，笔记本 ID 无效或导出过程中发生内部错误。

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义: `siyuan/kernel/api/router.go` (搜索 `/api/export/exportNotebookMd`)
-   主要逻辑: `siyuan/kernel/api/export.go` (函数 `exportNotebookMd`)
-   模型层导出逻辑: `siyuan/kernel/model/export.go` (函数 `ExportNotebookMarkdown`)

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

© 2024 社区贡献者们. [本文档源码](https://github.com/siyuan-note/siyuan-kernelApi-docs)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
