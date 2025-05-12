---
title: 搜索文档 (searchDocs)
---
# 端点

/api/filetree/searchDocs

## 接口描述

本接口用于通过关键词搜索文档。可以快速查找包含特定关键词的文档，返回文档的基本信息列表。

与全文搜索不同，该接口主要匹配文档路径（hPath）和文档名称，不会执行内容级别的全文搜索。多个关键词之间使用空格分隔，将执行"与"逻辑搜索（所有关键词都必须匹配）。

此API还可以选择性地只返回包含闪卡的文档，对于闪卡相关应用场景特别有用。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `k` | string | 是 | 搜索关键词，多个关键词用空格分隔，将进行与逻辑（AND）匹配 |
| `flashcard` | boolean | 否 | 是否仅搜索包含闪卡的文档。默认为 `false`。如果设置为 `true`，则只返回包含闪卡的文档，并会额外返回闪卡相关计数信息。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | array | 文档列表，每个对象包含匹配文档的信息。 |

文档列表中的每个对象结构如下：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `box` | string | 笔记本ID |
| `boxIcon` | string | 笔记本图标 |
| `path` | string | 文档路径 |
| `hPath` | string | 人类可读文档路径（包含笔记本名称前缀） |
| `newFlashcardCount` | string | 新闪卡数量（仅当 `flashcard=true` 时返回） |
| `dueFlashcardCount` | string | 到期闪卡数量（仅当 `flashcard=true` 时返回） |
| `flashcardCount` | string | 闪卡总数（仅当 `flashcard=true` 时返回） |

## 请求示例

```json
{
  "k": "思源 API",
  "flashcard": false
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
      "box": "20200812223209-lj3enxa",
      "boxIcon": "📔",
      "path": "/20210808180117-czj9bvb/20200813004931-q4cu8na.sy",
      "hPath": "思源笔记/思源API文档"
    },
    {
      "box": "20200812223209-lj3enxa",
      "boxIcon": "📔",
      "path": "/20210808180117-czj9bvb/20210721112206-mhr9wlb.sy",
      "hPath": "思源笔记/API示例代码"
    }
  ]
}
```

闪卡模式响应示例：

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "box": "20200812223209-lj3enxa",
      "boxIcon": "📔",
      "path": "/20210808180117-czj9bvb/20200813004931-q4cu8na.sy",
      "hPath": "思源笔记/思源API文档",
      "newFlashcardCount": "5",
      "dueFlashcardCount": "3",
      "flashcardCount": "8"
    }
  ]
}
```

无匹配结果（成功但无数据）：

```json
{
  "code": 0,
  "msg": "",
  "data": []
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：参数无效、JSON解析错误等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/filetree/searchDocs`）
-   API 处理函数：`siyuan/kernel/api/filetree.go`（函数 `searchDocs`，约第1012行）
-   模型层实现：`siyuan/kernel/model/file.go`（函数 `SearchDocsByKeyword`，约第141行）

实现细节：

-   该API首先解析请求参数，获取关键词 `k` 和是否只搜索闪卡的标志 `flashcard`
-   调用 `SearchDocsByKeyword` 函数，该函数会：
    -   获取所有已打开的笔记本
    -   处理搜索关键词，多个关键词使用空格分隔并执行AND逻辑
    -   搜索同时匹配笔记本名称和路径 (hPath) 中的所有关键词
    -   如果启用闪卡模式，会额外读取闪卡相关数据，并只返回包含闪卡的文档
    -   返回结果会按照人类可读路径（hPath）进行排序

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
