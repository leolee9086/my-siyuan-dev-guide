---
title: 设置本地存储
---
# 端点

/api/storage/setLocalStorage

# 设置本地存储

需要认证

## 接口描述

将值保存到思源笔记的本地存储中。可以用于保存插件配置、用户偏好设置或其他需要持久化的数据。如果指定的键已存在，则会覆盖原有的值。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| key | string | 是 | 存储键名 |
| val | string | 是 | 要存储的值（可以是字符串化的JSON） |

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
POST /api/storage/setLocalStorage HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "key": "custom-theme-config",
  "val": "{\"darkMode\":true,\"fontSize\":16,\"accentColor\":\"#3498db\"}"
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

