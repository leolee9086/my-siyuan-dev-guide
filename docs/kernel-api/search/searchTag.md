---
title: 搜索标签
---
# 端点

/api/search/searchTag

# 搜索标签

需要认证

## 接口描述

在笔记中搜索标签，可根据关键词查找相关标签。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| k | string | 否 | 搜索关键词 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | array | 返回数据，标签列表 |
| data\[\].name | string | 标签名称 |
| data\[\].count | number | 标签使用次数 |

请求示例

返回示例

### 请求示例

```
POST /api/search/searchTag HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "k": "笔记"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "name": "笔记",
      "count": 15
    },
    {
      "name": "笔记软件",
      "count": 6
    },
    {
      "name": "笔记方法",
      "count": 3
    }
  ]
}
```

