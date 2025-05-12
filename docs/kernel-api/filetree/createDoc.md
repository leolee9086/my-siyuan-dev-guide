---
title: 创建文档 (createDoc)
---
# 端点

/api/filetree/createDoc

## 接口描述

本接口用于在指定的笔记本中创建新文档。可以同时指定文档的路径、标题和初始 Markdown 内容。创建后会返回新文档的 ID。

文档创建后，可以通过笔记本的排序设置来影响文档在文档树中的显示顺序。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `notebook` | string | 是 | 笔记本 ID，用于指定在哪个笔记本中创建文档。 |
| `path` | string | 是 | 文档路径，形如 `/20200812223209-gj4fj9u/20210808180117-czj9bvb/20200813125239-hbwpz87.sy`。最后一级必须是符合 ID 格式的文件名。 |
| `title` | string | 是 | 文档标题，最大长度为 512 个字符。空白标题将被替换为"无标题"。不能包含 `/` 字符。 |
| `md` | string | 是 | 文档的 Markdown 内容，可以为空字符串。 |
| `sorts` | array | 否 | 文档树排序方式，如 `["custom", "name"]`、`["updated", "name"]` 等。不指定时使用笔记本默认排序设置。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | object | 包含 `id` 字段，表示新创建文档的 ID。 |

## 请求示例

```json
{
  "notebook": "20200812223209-lj3enxa",
  "path": "/20210808180117-czj9bvb/20230509112540-abcdef0.sy",
  "title": "我的新文档",
  "md": "# 我的新文档\n\n这是文档内容。",
  "sorts": ["custom", "name"]
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20230509112540-abcdef0"
  }
}
```

失败响应（笔记本不存在）：

```json
{
  "code": -1,
  "msg": "笔记本不存在",
  "data": null
}
```

失败响应（文件已存在）：

```json
{
  "code": -1,
  "msg": "文件已经存在",
  "data": null
}
```

失败响应（标题超长）：

```json
{
  "code": -1,
  "msg": "标题最大长度为 512 个字符",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：笔记本不存在、路径不合法、文件已存在、标题超长等。 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/createDoc`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `createDoc`）
-   模型层实现：
    -   `siyuan/kernel/model/file.go`（函数 `CreateDocByMd`、`createDoc`）

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
