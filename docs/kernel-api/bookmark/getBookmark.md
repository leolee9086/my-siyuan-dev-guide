---
title: 获取书签
---
# 端点

/api/bookmark/getBookmark

# 获取书签

需要认证

## 接口描述

获取思源笔记中的所有书签列表。书签是快速导航到特定内容的便捷方式，可以为任何块添加书签。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| sort | number | 否 | 排序方式，0: 按创建时间升序，1: 按创建时间降序，2: 按名称升序，3: 按名称降序，默认为0 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | array | 书签列表 |
| data\[\].box | string | 笔记本ID |
| data\[\].docID | string | 文档ID |
| data\[\].id | string | 书签ID，与块ID相同 |
| data\[\].name | string | 书签名称 |
| data\[\].path | string | 书签路径 |
| data\[\].hPath | string | 人类可读的书签路径 |
| data\[\].subType | string | 子类型 |
| data\[\].type | string | 书签块类型 |
| data\[\].updated | string | 更新时间 |
| data\[\].created | string | 创建时间 |
| data\[\].sort | number | 排序值 |

请求示例

返回示例

### 请求示例

```
POST /api/bookmark/getBookmark HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "sort": 1
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "box": "data",
      "docID": "20220301153724-vy37rik",
      "id": "20220301153816-dj8ul5t",
      "name": "思源笔记简介",
      "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
      "hPath": "/教程/思源笔记简介",
      "subType": "",
      "type": "h1",
      "updated": "20220301153816",
      "created": "20220301153816",
      "sort": 0
    },
    {
      "box": "data",
      "docID": "20220301154213-8kaibm7",
      "id": "20220301154215-c5tvkso",
      "name": "思源笔记架构",
      "path": "/20210808180117-czj9bvb/20220301154213-8kaibm7",
      "hPath": "/教程/思源笔记架构",
      "subType": "",
      "type": "h1",
      "updated": "20220301154215",
      "created": "20220301154215",
      "sort": 1
    }
  ]
}
```

