---
title: 导入 .sy.zip 文件
---
# 端点

/api/import/importSY

[← 返回 Import API 列表](../pages/import.html)

# 导入 .sy.zip 文件

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/import.go#L32)

`POST /api/import/importSY`

## 描述

导入通过"导出为 .sy.zip" 功能生成的单个或多个文档的压缩包。这通常用于在不同笔记本之间移动文档，或分享文档给他人导入。

## 请求参数

请求需要使用 `multipart/form-data` 格式发送。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `file` | `File` | 要导入的 `.sy.zip` 文件。 | 是 |
| `notebook` | `string` | 目标笔记本的 ID，导入的文档将存放在此笔记本中。 | 是 |
| `toPath` | `string` | 导入到目标笔记本内的路径（相对于笔记本根目录）。例如 `/导入的文档/` 或 `/` 表示根目录。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。导入过程是异步的，API 成功返回仅代表接收文件成功并开始处理。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果请求处理或文件接收、解压、导入过程中出错，`code` 会是 -1，并包含错误信息。

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
