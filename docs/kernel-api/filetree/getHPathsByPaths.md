---
title: 批量获取人类可读路径
---
# 端点

/api/filetree/getHPathsByPaths

[← 返回 FileTree API 列表](../pages/filetree.html)

# 批量获取人类可读路径

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/filetree.go#L321)

`POST /api/filetree/getHPathsByPaths`

## 描述

根据提供的文档或文件夹路径列表（相对于笔记本根目录），批量获取它们对应的人类可读路径（HPath）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `paths` | `array` of `string` | 要查询的文档或文件夹路径列表，路径相对于笔记本根目录。例如：`["/folder-a/doc-a.sy", "/doc-b.sy"]` | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段是一个字符串数组，包含与输入路径列表顺序对应的 HPath。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    "笔记本名称/folder-a/doc-a",
    "笔记本名称/doc-b"
  ]
}
```

如果列表中的某个路径无效或找不到，对应的 HPath 可能会是空字符串或包含错误信息，具体取决于实现细节，但请求通常仍然会返回 `code: 0`。

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
