---
title: 根据ID移动多个文档 (moveDocsByID)
---
# 端点

/api/filetree/moveDocsByID

## 接口描述

本接口用于根据文档ID将多个文档移动到目标位置。与moveDocs接口不同，该接口使用文档ID来指定来源和目标，而不是路径。

移动文档时会保持文档的内容、属性和子文档关系，仅更改文档的位置。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `fromIDs` | array | 是 | 要移动的文档ID数组，例如 `["20210808180117-czj9bvb", "20200813125239-hbwpz87"]`。 |
| `toID` | string | 是 | 目标文档ID，例如 `20210210102319-m0ql889`。文档会被移动到该ID对应的文档所在位置。 |
| `callback` | string | 否 | 回调函数标识，用于操作完成后前端接收通知。 |

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
  "fromIDs": [
    "20200813125239-hbwpz87",
    "20200822191536-rm6hwid"
  ],
  "toID": "20210210102319-m0ql889"
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

失败响应（ID不存在）：

```json
{
  "code": -1,
  "msg": "加载文档树失败 id [20210210102319-xxxx]: 文档块不存在",
  "data": {
    "closeTimeout": 7000
  }
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：文档ID不存在、无权限等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/moveDocsByID`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `moveDocsByID`）
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
