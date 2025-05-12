---
title: 获取文档人类可读路径 (getHPathByID)
---
# 端点

/api/filetree/getHPathByID

## 接口描述

本接口用于根据文档 ID 获取其人类可读路径（HPath）。HPath 是文档在笔记本中的层级结构路径，以文档标题组成，例如 `/笔记/子文件夹/文档标题`。

与物理存储路径（如 `/20210808180117-czj9bvb/20200813125239-hbwpz87.sy`）不同，HPath 更易于用户理解和记忆。

注意：此接口返回的 HPath 不包含笔记本名称。如需获取包含笔记本名称的完整路径，请使用 `/api/filetree/getFullHPathByID` 接口。

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
| `data` | string | 文档的人类可读路径（HPath），以 `/` 开头，例如 `/笔记/子文件夹/文档标题`。 |

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
  "data": "/笔记/待办事项/项目计划"
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

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/getHPathByID`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `getHPathByID`）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `GetHPathByID`）

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
