---
title: 导入标准 Markdown
---
# 端点

/api/import/importStdMd

[← 返回 Import API 列表](../pages/import.html)

# 导入标准 Markdown

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/import.go#L170)

POST /api/import/importStdMd

## 描述

从本地文件系统导入标准的 Markdown 文件（`.md`）或包含 Markdown 文件的文件夹到指定的笔记本和路径下。导入时会自动将 `.md` 文件转换为思源笔记的 `.sy` 格式。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `notebook` | `string` | 目标笔记本的 ID。 | 是 |
| `localPath` | `string` | 要导入的本地 Markdown 文件或文件夹的绝对路径。 | 是 |
| `toPath` | `string` | 导入到目标笔记本内的路径（相对于笔记本根目录）。例如 `/imported-markdown/`。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。导入过程可能是异步的，API 成功返回仅代表开始处理。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果请求处理或导入过程中出错（例如路径不存在、文件无读取权限、转换失败等），`code` 会是 -1，并包含错误信息。

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
