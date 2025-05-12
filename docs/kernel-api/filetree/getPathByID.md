---
title: 根据 ID 获取文档路径 (getPathByID)
---
# 端点

/api/filetree/getPathByID

## 接口描述

本接口用于根据文档 ID 获取其物理存储路径和所属笔记本。物理路径是指文档在文件系统中的实际存储位置，由 ID 组成，例如 `/20210808180117-czj9bvb/20200813125239-hbwpz87.sy`。

此接口常用于需要通过文档 ID 定位文件的场景，比如从 ID 链接跳转到文档、在文件系统级别操作文档等。

与 `/api/filetree/getHPathByID` 不同，该接口返回的是系统内部使用的物理路径，而非人类可读的路径。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `id` | string | 是 | 文档 ID，例如 `20200813125239-hbwpz87`。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | object | 包含以下字段：
-   `path`: 文档的物理存储路径，例如 `/20210808180117-czj9bvb/20200813125239-hbwpz87.sy`。
-   `notebook`: 文档所属笔记本的 ID，例如 `20200812223209-lj3enxa`。

 |

## 请求示例

```json
{
  "id": "20200813125239-hbwpz87"
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/20210808180117-czj9bvb/20200813125239-hbwpz87.sy",
    "notebook": "20200812223209-lj3enxa"
  }
}
```

失败响应（ID 无效或文档不存在）：

```json
{
  "code": -1,
  "msg": "文档不存在",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：ID 格式无效、文档不存在等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/getPathByID`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `getPathByID`）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `GetPathByID`）

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
