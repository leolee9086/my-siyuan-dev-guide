---
title: 重命名书签
---
# 端点

/api/bookmark/renameBookmark

# 重命名书签

需要认证

## 接口描述

修改指定ID的书签名称。使用此接口可以更新书签的显示名称，方便组织和管理书签。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 书签ID |
| name | string | 是 | 新的书签名称 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据 |

请求示例

返回示例

### 请求示例

```
POST /api/bookmark/renameBookmark HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153816-dj8ul5t",
  "name": "思源笔记核心概念"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

