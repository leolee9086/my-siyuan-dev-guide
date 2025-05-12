---
title: 创建每日笔记 (createDailyNote)
---
# 端点

/api/filetree/createDailyNote

## 接口描述

本接口用于创建或打开今天的每日笔记文档。如果文档已存在，将返回现有文档的 ID；如果不存在，则会根据笔记本的每日笔记设置创建新文档，然后返回新创建文档的 ID。

每日笔记的创建路径由笔记本配置中的 `dailyNoteSavePath` 模板决定，默认值为 `/daily note/{{now | date "2006/01"}}/{{now | date "2006-01-02"}}`。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `notebook` | string | 是 | 笔记本 ID，用于指定在哪个笔记本中创建每日笔记。 |
| `app` | string | 否 | 客户端应用标识，用于事件推送。 |
| `callback` | string | 否 | 用于事件回调的标识符。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | object | 包含 `id` 字段，表示创建或获取的每日笔记的文档 ID。 |

## 请求示例

```json
{
  "notebook": "20200812223209-lj3enxa"
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20200915111353-az8ppkf"
  }
}
```

失败响应（笔记本不存在）：

```json
{
  "code": 1,
  "msg": "notebook not found",
  "data": null
}
```

失败响应（未配置每日笔记保存路径）：

```json
{
  "code": -1,
  "msg": "未设置每日笔记存放路径，请在 [设置 - 资源文件] 中配置",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `1` | 笔记本不存在（ErrBoxNotFound） |
| `-1` | 其他错误，如未设置每日笔记存放路径、模板渲染失败等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/createDailyNote`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `createDailyNote`）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `CreateDailyNote`）

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
