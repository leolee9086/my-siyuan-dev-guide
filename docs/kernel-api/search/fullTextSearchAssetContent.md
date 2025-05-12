---
title: 资源文件内容全文搜索
---
# 端点

/api/search/fullTextSearchAssetContent

# 资源文件内容全文搜索

需要认证 需要付费

## 接口描述

对已建立索引的资源文件（Assets）内容进行全文搜索。

注意：此功能需要思源笔记付费订阅才能使用。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`fullTextSearchAssetContent` 函数)
-   核心逻辑: [siyuan/kernel/model/asset\_content.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/asset_content.go) (`FullTextSearchAssetContent` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| query | string | 是 | 搜索的查询语句。根据 `method` 的不同，可以是关键字、查询语法、SQL 或正则表达式。 |
| types | object | 是 | 一个对象，键是文件扩展名（如 ".pdf", ".txt"），值是布尔类型，表示是否搜索该类型的文件。 |
| method | number | 是 | 搜索方法：0: 关键字 (默认), 1: 查询语法, 2: SQL, 3: 正则表达式。 |
| orderBy | number | 是 | 排序方式：0: 相关度降序 (默认), 1: 相关度升序, 2: 更新时间升序, 3: 更新时间降序。 |
| page | number | 是 | 页码，从 1 开始。 |
| pageSize | number | 否 | 每页结果数量，默认为 50 或由系统配置决定。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，非 0 表示失败 (例如未付费返回 1)。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含搜索结果的对象。 |
| data.assetContents | array | 匹配到的资源文件信息对象数组。 |
| data.assetContents\[\].id | string | 资源文件在内部数据库中的 ID (不是块 ID)。 |
| data.assetContents\[\].name | string | 资源文件名。 |
| data.assetContents\[\].ext | string | 文件扩展名。 |
| data.assetContents\[\].path | string | 资源文件相对于 `data/` 目录的路径。 |
| data.assetContents\[\].size | number | 文件大小 (字节)。 |
| data.assetContents\[\].hSize | string | 人类可读的文件大小。 |
| data.assetContents\[\].updated | number | 文件最后更新时间戳 (秒)。 |
| data.assetContents\[\].content | string | 包含搜索关键词的上下文内容片段，关键词会被 `<mark>` 标签包围。 |
| data.matchedAssetCount | number | 总共匹配到的资源文件数量。 |
| data.pageCount | number | 总页数。 |

请求示例

返回示例

### 请求示例

```json
{
  "query": "思源笔记",
  "types": {
    ".pdf": true,
    ".txt": true
  },
  "method": 0,
  "orderBy": 0,
  "page": 1,
  "pageSize": 10
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "assetContents": [
      {
        "id": "20231101100000-abcdef0",
        "name": "产品介绍.pdf",
        "ext": ".pdf",
        "path": "assets/产品介绍.pdf",
        "size": 150000,
        "hSize": "146.48 KB",
        "updated": 1667296800,
        "content": "...本文档介绍了<mark>思源笔记</mark>的主要功能..."
      },
      {
        "id": "20231102110000-ghijkl1",
        "name": "用户手册.txt",
        "ext": ".txt",
        "path": "assets/用户手册.txt",
        "size": 50000,
        "hSize": "48.83 KB",
        "updated": 1667383200,
        "content": "...欢迎使用<mark>思源笔记</mark>，开始你的知识管理之旅..."
      }
    ],
    "matchedAssetCount": 2,
    "pageCount": 1
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
