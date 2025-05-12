---
title: 更新或插入内核索引
---
# 端点

/api/filetree/upsertIndexes

[← 返回 FileTree API 列表](../pages/filetree.html)

# 更新或插入内核索引

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L139)

`POST /api/filetree/upsertIndexes`

## 描述

根据提供的路径列表，在思源笔记的内核索引（数据库）中添加新的文档/文件夹条目，或者更新已存在的条目。这个操作会读取对应的 `.sy` 文件内容并更新索引信息。

**注意：** 这通常是一个内部维护使用的 API，用于在外部创建或修改文件后，手动触发特定文件的索引更新。普通插件或用户通常不需要直接调用此 API。它主要用于确保索引与实际文件系统状态保持一致。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `paths` | `array` of `string` | 要更新或插入索引的文档或文件夹路径列表，路径相对于笔记本根目录。例如：`["/new-folder", "/updated-doc.sy"]` | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 始终为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

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
