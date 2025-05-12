---
title: 获取当前时间
---
# 端点

/api/system/currentTime

# 获取当前时间

需要认证

## 接口描述

获取思源笔记服务器的当前系统时间，返回Unix时间戳（毫秒）。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | number | 当前系统时间（Unix时间戳，毫秒） |

请求示例

返回示例

### 请求示例

```
POST /api/system/currentTime HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": 1650123456789
}
```

