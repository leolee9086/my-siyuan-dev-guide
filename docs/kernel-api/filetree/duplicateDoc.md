---
title: 复制文档
---
# 端点

/api/filetree/duplicateDoc

# 复制文档

需要认证

## 接口描述

复制指定的文档。此操作将在当前目录下创建一个新的文档，包含原文档的所有内容和子文档结构。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要复制的文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.id | string | 新创建的文档ID |
| data.rootID | string | 新文档根ID |
| data.parentID | string | 新文档的父文档ID |
| data.box | string | 笔记本ID |
| data.path | string | 新文档路径 |
| data.hPath | string | 新文档的人类可读路径 |
| data.name | string | 新文档名称（通常会在原名称后添加后缀） |

请求示例

返回示例

### 请求示例

```
POST /api/filetree/duplicateDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153724-vy37rik"
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20230602100000-ghijk12",
    "rootID": "20230602100000-ghijk12",
    "parentID": "",
    "box": "20210808180117-czj9bvb",
    "path": "/20210808180117-czj9bvb/20230602100000-ghijk12.sy",
    "hPath": "/教程/思源笔记简介 1",
    "name": "思源笔记简介 1"
  }
}
```

