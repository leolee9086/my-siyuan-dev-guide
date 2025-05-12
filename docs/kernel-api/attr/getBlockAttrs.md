---
title: getBlockAttrs
---
# 端点

/api/attr/getBlockAttrs

# getBlockAttrs

需要认证

## 接口描述

/api/attr/getBlockAttrs 的接口描述待补充。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 块 ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回的具体数据 |

请求示例

返回示例

### 请求示例

```
POST /api/attr/getBlockAttrs
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

