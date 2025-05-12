---
title: 更改文件树排序
---
# 端点

/api/filetree/changeSort

[← 返回 FileTree API 列表](../pages/filetree.html)

# 更改文件树排序

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L809)

`POST /api/filetree/changeSort`

## 描述

更改指定笔记本中文件（文档）或文件夹的手动排序。传入的路径列表的顺序即为新的排序顺序。

**注意：** 此 API 仅在笔记本或文件夹的排序方式设置为"手动排序"时生效。对于按其他方式（如修改时间、标题等）排序的目录，此 API 不会产生效果。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `notebook` | `string` | 目标笔记本的 ID | 是 |
| `paths` | `array` of `string` | 要排序的文件或文件夹路径列表，路径相对于笔记本根目录。列表的顺序即为新的排序顺序。例如：`["/doc-b.sy", "/folder-a", "/doc-c.sy"]` | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 始终为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 补充说明

此操作会修改笔记本配置文件（`notebook.json`）中的排序信息。操作成功后，文件树界面会相应更新。

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
