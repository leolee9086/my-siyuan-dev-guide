---
title: 批量移除文档或文件夹
---
# 端点

/api/filetree/removeDocs

[← 返回 FileTree API 列表](../pages/filetree.html)

# 批量移除文档或文件夹

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L468)

`POST /api/filetree/removeDocs`

## 描述

根据提供的路径列表，批量将文档或文件夹移动到操作系统的回收站。如果路径指向一个文件夹，则该文件夹及其所有内容都将被移除。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `paths` | `array` of `string` | 要移除的文档或文件夹路径列表，路径相对于笔记本根目录。例如：`["/folder-to-remove", "/doc-to-remove.sy"]` | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 始终为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

即使列表中的部分路径无效或文件不存在，API 通常也会尝试删除有效的路径并返回成功。具体错误处理可能依赖底层实现。

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
