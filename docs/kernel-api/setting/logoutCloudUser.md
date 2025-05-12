---
title: 登出云用户
---
# 端点

/api/setting/logoutCloudUser

# 登出云用户

需要认证 管理员权限 只读模式禁用

## 接口描述

登出当前已登录的云端账户。调用此接口后，当前的云端用户会话将失效。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | null | 成功时固定为 null。 |

请求示例

成功返回示例

### 请求示例

```
POST /api/setting/logoutCloudUser HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

