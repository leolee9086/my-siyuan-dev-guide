---
title: 获取资源文件内容片段
---
# 端点

/api/search/getAssetContent

# 获取资源文件内容片段

需要认证

## 接口描述

获取指定资源文件（Asset）的内容片段，并高亮指定的查询关键词。

通常用于资源文件搜索结果的预览区域，展示匹配到的内容上下文。

注意：需要先对资源文件内容建立索引。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`getAssetContent` 函数)
-   核心逻辑: [siyuan/kernel/model/asset\_content.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/asset_content.go) (`GetAssetContent` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要获取内容的资源文件在内部数据库中的 ID。这个 ID 通常从 `fullTextSearchAssetContent` 或 `searchAsset` 接口的响应中获取。**注意：这不是块 ID。** |
| query | string | 是 | 需要在返回内容中高亮的关键词。 |
| queryMethod | number | 是 | 查询方法，用于确定如何处理 \`query\`：0: 关键字, 1: 查询语法。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.assetContent | object | 包含资源文件信息的对象。如果找不到对应的资源文件或发生错误，可能为 \`null\`。 |
| data.assetContent.id | string | 资源文件数据库记录 ID。 |
| data.assetContent.name | string | 文件名。 |
| data.assetContent.ext | string | 文件扩展名。 |
| data.assetContent.path | string | 资源文件路径 (相对于 data/)。 |
| data.assetContent.size | number | 文件大小 (字节)。 |
| data.assetContent.hSize | string | 人类可读的文件大小。 |
| data.assetContent.updated | number | 文件最后更新时间戳 (秒)。 |
| data.assetContent.content | string | 匹配到的内容片段，关键词用 `<mark>` 标签高亮，换行符替换为 `<br>`。 |

请求示例

返回示例

### 请求示例

```json
{
  "id": "20231101100000-abcdef0",
  "query": "思源笔记",
  "queryMethod": 0
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "assetContent": {
      "id": "20231101100000-abcdef0",
      "name": "产品介绍.pdf",
      "ext": ".pdf",
      "path": "assets/产品介绍.pdf",
      "size": 150000,
      "hSize": "146.48 KB",
      "updated": 1667296800,
      "content": "...本文档介绍了<mark>思源笔记</mark>的主要功能，包括双向链接、块引用等特性...<br>...<mark>思源笔记</mark>是本地优先的笔记软件..."
    }
  }
}
```

