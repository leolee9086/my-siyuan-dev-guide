---
title: 移除内核索引
---
# 端点

/api/filetree/removeIndexes

[← 返回 FileTree API 列表](../pages/filetree.html)

# 移除内核索引

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L156)

`POST /api/filetree/removeIndexes`

## 描述

根据提供的路径列表，从思源笔记的内核索引（数据库）中移除对应的文档或文件夹条目。这个操作不会删除实际的文件，仅仅是清理索引数据。

**注意：** 这通常是一个内部维护使用的 API，用于处理索引异常或进行手动清理。普通插件或用户通常不需要直接调用此 API。误用可能导致搜索、反链等功能异常，直到下次重建索引。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `paths` | `array` of `string` | 要移除索引的文档或文件夹路径列表，路径相对于笔记本根目录。例如：`["/folder-to-unindex", "/doc-to-unindex.sy"]` | 是 |

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
