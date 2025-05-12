---
title: 导出多个 Markdown 文档 (exportMds)
---
# 端点

/api/export/exportMds

## 接口描述

本接口用于将指定的多个文档导出为独立的 Markdown 文件，并将这些文件打包成一个 ZIP 压缩包供下载。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `ids` | string\[\] | 是 | 需要导出的文档 ID 数组。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含导出的 ZIP 文件信息：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 导出的 ZIP 压缩包的名称。 |
| `zip` | string | 导出的 ZIP 压缩包在服务器上的（临时）路径。客户端通常需要结合其他接口（如下载接口）或根据此路径构建下载链接。 |

如果发生错误，响应体的 `code` 字段将为非 0 值，`msg` 字段将包含错误信息。

## 请求示例

```json
{
  "ids": ["20230509100000-abcdef0", "20230509100001-1234567"]
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "export-20230509110000.zip",
    "zip": "/temp/export/export-20230509110000.zip"
  }
}
```

失败响应（示例）：

```json
{
  "code": 1,
  "msg": "Error occurred during export.",
  "data": {
    "closeTimeout": 7000
  }
}
```

## 错误码

-   `0`: 成功
-   其他非零值: 失败，具体错误信息请参考 `msg` 字段。

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义: `siyuan/kernel/api/router.go` (搜索 `/api/export/exportMds`)
-   主要逻辑: `siyuan/kernel/api/export.go` (函数 `exportMds`)
-   模型层导出逻辑: `siyuan/kernel/model/export.go` (函数 `ExportPandocConvertZip`)

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
