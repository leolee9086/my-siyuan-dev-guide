---
title: 移动多个文档 (moveDocs)
---
# 端点

/api/filetree/moveDocs

## 接口描述

本接口用于将指定路径的多个文档移动到目标位置。可以批量移动多个文档，支持跨笔记本移动。

移动文档时会保持文档的内容、属性和子文档关系，仅更改文档的位置。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `fromPaths` | array | 是 | 要移动的文档路径数组，每个路径是一个对象，包含 `notebook` (笔记本ID) 和 `path` (文档路径) 字段。 |
| `toNotebook` | string | 是 | 目标笔记本 ID，例如 `20200812223209-lj3enxa`。 |
| `toPath` | string | 是 | 目标路径，使用物理路径（ID 路径），例如 `/20210808180117-czj9bvb`。根目录使用 `/`。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | null | 此接口无返回数据，成功时为 `null`。 |

## 请求示例

```json
{
  "fromPaths": [
    {
      "notebook": "20200812223209-lj3enxa",
      "path": "/20210808180117-czj9bvb/20200813125239-hbwpz87.sy"
    },
    {
      "notebook": "20200812223209-lj3enxa",
      "path": "/20210808180117-czj9bvb/20200822191536-rm6hwid.sy"
    }
  ],
  "toNotebook": "20201225233048-k652j9g",
  "toPath": "/20210210102319-m0ql889"
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": null
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

失败响应（路径无效）：

```json
{
  "code": -1,
  "msg": "路径无效",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：笔记本不存在、路径无效、无权限等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/moveDocs`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `moveDocs`）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `MoveDocs`）

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
