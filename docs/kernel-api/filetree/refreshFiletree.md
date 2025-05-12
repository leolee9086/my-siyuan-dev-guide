---
title: 刷新文件树
---
# 端点

/api/filetree/refreshFiletree

[← 返回 FileTree API 列表](../pages/filetree.html)

# 刷新文件树

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go)

`POST /api/filetree/refreshFiletree`

## 描述

刷新文件树，重新加载文件系统中的文件和文件夹。当外部程序修改了文件系统中的文件时，可以调用此 API 使思源笔记重新扫描并更新文件树显示。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `notebook` | `string` | 需要刷新的笔记本 ID。如果为空，则刷新所有笔记本 | 否 |
| `force` | `boolean` | 是否强制刷新，忽略缓存 | 否 |
| `path` | `string` | 需要刷新的路径，如 "/path/to/folder"。如果为空，则刷新整个笔记本 | 否 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。

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
