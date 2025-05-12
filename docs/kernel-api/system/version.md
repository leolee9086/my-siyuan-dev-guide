---
title: 获取思源笔记版本
---
# 端点

/api/system/version

# 获取思源笔记版本

无需认证

## 接口描述

获取思源笔记当前安装的版本号。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | string | 当前思源笔记的版本号，例如 "3.0.17" |

请求示例

返回示例

### 请求示例

```
POST /api/system/version HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": "3.0.17"
}
```

