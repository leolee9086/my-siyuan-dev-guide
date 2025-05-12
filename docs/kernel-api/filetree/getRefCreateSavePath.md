---
title: 获取引用创建时文档的默认保存路径
---
# 端点

/api/filetree/getRefCreateSavePath

[← 返回 FileTree API 列表](../pages/filetree.html)

# 获取引用创建时文档的默认保存路径

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L756)

`POST /api/filetree/getRefCreateSavePath`

## 描述

获取当通过"提及"（例如输入 `((块引用))`）或"嵌入块"（例如输入 `/嵌入块`）引用一个不存在的文档时，这个新文档将被默认创建在哪个笔记本的哪个路径下。

这个路径由系统设置（设置 -> 文件树 -> 引用创建时自动创建文档路径）和当前笔记本的设置共同决定，且路径模板支持 Go 模板语法（例如日期变量）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `notebook` | `string` | 当前操作所在的笔记本 ID。用于确定默认路径配置的上下文。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段是一个对象，包含最终计算出的目标笔记本 ID 和保存路径。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "box": "20200812220555-lj3enxa", // 目标笔记本 ID
    "path": "/refs/{{.Year}}-{{.Month}}-{{.Day}}/新引用文档.sy" // 渲染后的目标路径 (相对于 box)
  }
}
```

路径中的 `{{.Year}}`, `{{.Month}}`, `{{.Day}}` 等是 Go 模板变量，在实际创建时会被替换为当前日期。

如果计算过程中发生错误（例如模板渲染失败），`code` 可能为非 0，并包含错误信息。

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
