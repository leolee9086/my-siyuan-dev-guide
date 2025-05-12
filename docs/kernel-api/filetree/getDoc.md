---
title: 获取文档内容
---
# 端点

/api/filetree/getDoc

# 获取文档内容

需要认证

## 接口描述

获取指定文档的详细内容，包括文档元数据和所有的块。可以选择是否包含子文档内容。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 文档ID |
| mode | number | 否 | 获取模式，0: 只获取当前文档，1: 获取当前文档和直接子文档，2: 获取当前文档和所有子文档。默认为0 |
| size | number | 否 | 限制返回的子文档数量，仅在mode为1或2时有效，默认返回所有子文档 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.id | string | 文档ID |
| data.rootID | string | 文档根ID |
| data.parentID | string | 父文档ID |
| data.box | string | 笔记本ID |
| data.path | string | 文档路径 |
| data.hPath | string | 人类可读的文档路径 |
| data.name | string | 文档名称 |
| data.created | string | 创建时间 |
| data.updated | string | 更新时间 |
| data.sort | number | 排序顺序 |
| data.content | string | 文档内容 |
| data.title | string | 文档标题 |
| data.icon | string | 文档图标 |
| data.memo | string | 文档备注 |
| data.blocks | array | 文档中的块列表 |
| data.children | array | 子文档列表，当mode非0时返回 |

请求示例

返回示例

### 请求示例

```
POST /api/filetree/getDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153724-vy37rik",
  "mode": 0
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20220301153724-vy37rik",
    "rootID": "20220301153724-vy37rik",
    "parentID": "",
    "box": "20210808180117-czj9bvb",
    "path": "/20210808180117-czj9bvb/20220301153724-vy37rik.sy",
    "hPath": "/教程/思源笔记简介",
    "name": "思源笔记简介",
    "created": "20220301153724",
    "updated": "20230415115504",
    "sort": 0,
    "content": "",
    "title": "思源笔记简介",
    "icon": "1f4dd",
    "memo": "",
    "blocks": [
      {
        "id": "20220301153816-dj8ul5t",
        "type": "h1",
        "content": "思源笔记简介",
        "depth": 0,
        "children": []
      },
      {
        "id": "20220301153845-pn6ig6o",
        "type": "p",
        "content": "思源笔记是一款本地优先的个人知识管理系统，支持完全离线使用，同时也支持端到端加密同步。",
        "depth": 1,
        "children": []
      },
      {
        "id": "20220301153927-kq9m7qs",
        "type": "h2",
        "content": "核心特性",
        "depth": 1,
        "children": []
      }
    ]
  }
}
```

