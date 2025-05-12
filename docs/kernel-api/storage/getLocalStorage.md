---
title: 获取本地存储
---
# 端点

/api/storage/getLocalStorage

# 获取本地存储

需要认证

## 接口描述

获取思源笔记本地存储中指定键的值。本地存储可用于保存各种配置和自定义数据，类似于浏览器的localStorage但在思源笔记的后端实现。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| key | string | 是 | 存储键名 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 键对应的值，如果键不存在则返回空字符串 |

请求示例

返回示例

### 请求示例

```
POST /api/storage/getLocalStorage HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "key": "custom-theme-config"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": "{\"darkMode\":true,\"fontSize\":16,\"accentColor\":\"#3498db\"}"
}
```

