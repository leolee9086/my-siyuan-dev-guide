---
title: 全文搜索块
---
# 端点

/api/search/fullTextSearchBlock

# 全文搜索块

需要认证

## 接口描述

全文搜索所有块内容，支持各种搜索条件和过滤选项。可以按关键词、查询语法、SQL或正则表达式进行搜索，并支持按创建时间、更新时间等排序。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| query | string | 是 | 搜索关键词 |
| page | number | 否 | 页码，从1开始，默认为1 |
| types | array | 否 | 块类型过滤，如 \["d","h","p","c"\] 等，不填则搜索所有类型 |
| paths | array | 否 | 路径过滤，可以指定在哪些路径下搜索 |
| method | number | 否 | 搜索方式，0: 关键字，1: 查询语法，2: SQL，3: 正则表达式，默认为0 |
| orderBy | number | 否 | 排序方式，0: 相关度，1: 创建时间，2: 更新时间，3: 内容长度，默认为0 |
| groupBy | number | 否 | 分组方式，0: 不分组，1: 按文档分组，默认为0 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.blocks | array | 匹配到的块列表 |
| data.blocks\[\].id | string | 块ID |
| data.blocks\[\].content | string | 块内容 |
| data.blocks\[\].type | string | 块类型 |
| data.blocks\[\].path | string | 块路径 |
| data.blocks\[\].hPath | string | 人类可读的块路径 |
| data.blocks\[\].created | string | 创建时间 |
| data.blocks\[\].updated | string | 更新时间 |
| data.matchedBlockCount | number | 匹配的块总数 |
| data.pageCount | number | 总页数 |

请求示例

返回示例

### 请求示例

```
POST /api/search/fullTextSearchBlock HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "query": "思源笔记",
  "page": 1,
  "types": ["p", "h"],
  "paths": ["/20210808180117-czj9bvb"],
  "method": 0,
  "orderBy": 1,
  "groupBy": 0
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "blocks": [
      {
        "id": "20220301153724-r5zsw01",
        "content": "思源笔记是一款本地优先的个人知识管理系统",
        "type": "p",
        "path": "/20210808180117-czj9bvb/20220301153724-r5zsw01",
        "hPath": "/教程/思源笔记简介",
        "created": "20220301153724",
        "updated": "20220301153724",
        "rootID": "20210808180117-czj9bvb",
        "box": "data",
        "depth": 1,
        "children": []
      },
      {
        "id": "20220301154213-w6f4xj9",
        "content": "思源笔记的技术架构",
        "type": "h",
        "path": "/20210808180117-czj9bvb/20220301154213-w6f4xj9",
        "hPath": "/教程/思源笔记架构",
        "created": "20220301154213",
        "updated": "20220301154213",
        "rootID": "20210808180117-czj9bvb",
        "box": "data",
        "depth": 1,
        "children": []
      }
    ],
    "matchedBlockCount": 2,
    "pageCount": 1
  }
}
```

