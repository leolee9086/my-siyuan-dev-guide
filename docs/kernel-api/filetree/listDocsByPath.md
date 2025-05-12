---
title: 列出指定路径下的文档 (listDocsByPath)
---
# 端点

/api/filetree/listDocsByPath

## 接口描述

本接口用于列出指定笔记本和路径下的所有文档。它返回路径下的文档和子文档的详细信息，包括文档ID、名称、图标、创建时间等。

该接口常用于构建文档树视图，或获取某个目录下的所有文档信息。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `notebook` | string | 是 | 笔记本 ID，例如 `20200812223209-lj3enxa`。 |
| `path` | string | 是 | 文档路径，使用物理路径（ID 路径），例如 `/20210808180117-czj9bvb`。根目录使用 `/`。 |
| `sort` | number | 否 | 排序方式：0 按名称升序，1 按更新时间降序，2 按创建时间降序，3 按自定义排序。默认为 0。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | array | 文档信息对象数组，每个对象包含以下字段：
-   `path`: 文档的路径
-   `name`: 文档名称
-   `icon`: 文档图标
-   `id`: 文档ID
-   `count`: 文档中的块数量
-   `size`: 文档大小
-   `hSize`: 人类可读的文档大小
-   `mtime`: 最后修改时间（Unix 时间戳，毫秒）
-   `ctime`: 创建时间（Unix 时间戳，毫秒）
-   `subFileCount`: 子文档数量

 |

## 请求示例

```json
{
  "notebook": "20200812223209-lj3enxa",
  "path": "/",
  "sort": 1
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "path": "/20210808180117-czj9bvb/20200813125239-hbwpz87.sy",
      "name": "思源笔记用户指南",
      "icon": "1f4d4",
      "id": "20200813125239-hbwpz87",
      "count": 123,
      "size": 45678,
      "hSize": "44.6 KB",
      "mtime": 1631456789000,
      "ctime": 1597313559000,
      "subFileCount": 5
    },
    {
      "path": "/20210808180117-czj9bvb/20200822191536-rm6hwid.sy",
      "name": "请从这里开始",
      "icon": "",
      "id": "20200822191536-rm6hwid",
      "count": 45,
      "size": 12345,
      "hSize": "12.1 KB",
      "mtime": 1631456789000,
      "ctime": 1598122536000,
      "subFileCount": 0
    }
  ]
}
```

失败响应（笔记本不存在）：

```json
{
  "code": -1,
  "msg": "笔记本不存在",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：笔记本不存在、路径无效等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/listDocsByPath`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `listDocsByPath`）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `ListDocsByPath`）

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
