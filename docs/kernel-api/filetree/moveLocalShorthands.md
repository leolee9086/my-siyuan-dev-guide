---
title: 移动本地闪记 (moveLocalShorthands)
---
# 端点

/api/filetree/moveLocalShorthands

## 接口描述

本接口用于将本地闪记（速记）移动到指定笔记本的文档中。闪记是思源笔记中用于快速记录临时想法的功能，存储在特定目录下的Markdown文件。

该API有两种工作模式：

1.  当提供了路径（path）参数时，会将所有闪记合并到指定路径的文档中；
2.  当未提供路径参数时，每个闪记会创建为一个独立的文档，文档名为闪记的创建时间。

移动操作同时会处理闪记中引用的资源文件，将它们移动到思源笔记的assets目录中。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `notebook` | string | 是 | 目标笔记本ID，例如 `20210808180117-czj9bvb`。 |
| `path` | string | 否 | 目标文档的层级路径，例如 `/闪记收集`。如果提供此参数，所有闪记将被合并到此文档中；如果不提供，则为每个闪记创建单独的文档。 |
| `parentID` | string | 否 | 目标父文档ID，创建新文档时使用。当未指定path时，用于指定新建文档的父级位置。 |

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
  "notebook": "20210808180117-czj9bvb",
  "path": "/闪记收集",
  "parentID": ""
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

失败响应（笔记本ID不存在）：

```json
{
  "code": -1,
  "msg": "查询笔记本失败 [ID] [20210808180117-invalid]",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：笔记本ID不存在、无权限访问、IO操作错误等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/moveLocalShorthands`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `moveLocalShorthands`）
-   模型层实现：`siyuan/kernel/model/shortcuts.go`（函数 `MoveLocalShorthands`）

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
