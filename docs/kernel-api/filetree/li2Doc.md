---
title: 列表项转换为文档
---
# 端点

/api/filetree/li2Doc

[← 返回 FileTree API 列表](../pages/filetree.html)

# 列表项转换为文档

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L251)

`POST /api/filetree/li2Doc`

## 描述

将一个文档中的列表项块（及其下所有子项，包括嵌套列表）转换为一个新的独立文档。这对于将列表中的复杂内容独立成篇非常有用。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `srcListItemID` | `string` | 源列表项块的 ID，这个列表项及其内容将被转换为新文档 | 是 |
| `targetNoteBook` | `string` | 目标笔记本的 ID，新文档将创建在这个笔记本中 | 是 |
| `targetPath` | `string` | 新文档在目标笔记本中的保存路径（相对于笔记本根目录），必须以 `.sy` 结尾。例如：`/folder/new-list-doc.sy` | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 理论上不直接返回数据给调用方，但操作成功后会通过 WebSocket 推送 `li2doc` 事件，包含新文档的信息。

```json
{
  "code": 0,
  "msg": "",
  "data": null // 通常为 null，具体信息通过 WebSocket 推送
}

// WebSocket 推送事件 (li2doc) 示例:
{
  "cmd": "li2doc",
  "data": {
    "box": { // 目标笔记本信息
      "id": "20200812220555-lj3enxa",
      "name": "思源笔记",
      "icon": "",
      "sort": 0,
      "closed": false
    },
    "path": "/new-list-doc.sy",        // 新文档的路径
    "files": [ /* 同级文件列表 */ ],
    "name": "new-list-doc.sy",        // 新文档的文件名
    "id": "20230101120001-mnopqr", // 新文档的 ID (根块 ID)
    "srcRootBlockID": "20221231100001-stuvwxyz" // 源列表项块的 ID
  },
  "callback": null // 如果请求中包含 callback 参数，则原样返回
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
