---
title: 移除书签
---
# 端点

/api/bookmark/removeBookmark

# 移除书签

需要认证

## 接口描述

从思源笔记中移除指定ID的书签。移除书签后，该块仍然存在，只是不再出现在书签列表中。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要移除的书签ID |

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
POST /api/bookmark/removeBookmark HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153816-dj8ul5t"
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

