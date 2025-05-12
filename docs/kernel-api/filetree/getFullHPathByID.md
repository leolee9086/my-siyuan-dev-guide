---
title: 获取完整人类可读路径
---
# 端点

/api/filetree/getFullHPathByID

[← 返回 FileTree API 列表](../pages/filetree.html)

# 获取完整人类可读路径

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L367)

`POST /api/filetree/getFullHPathByID`

## 描述

根据指定的文档块 ID 或文档 ID，获取其对应的完整人类可读路径（HPath）。这个路径通常包含了笔记本名称、所有上级文件夹名称和文档名称，用 `/` 分隔。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要查询的文档块 ID 或文档 ID | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段包含获取到的完整人类可读路径字符串。

```json
{
  "code": 0,
  "msg": "",
  "data": "笔记本名称/文件夹/子文件夹/文档名称" // 完整人类可读路径 (HPath)
}
```

如果提供的 ID 无效或找不到对应的路径，`code` 可能为非 0，并包含错误信息。

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
