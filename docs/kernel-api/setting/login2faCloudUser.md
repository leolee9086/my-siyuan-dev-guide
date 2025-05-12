---
title: 使用 2FA 登录云用户
---
# 端点

/api/setting/login2faCloudUser

# 使用 2FA 登录云用户

需要认证 管理员权限 只读模式禁用

## 接口描述

使用两步验证 (2FA) 代码登录云端用户。此操作需要在获取到临时 token 后进行，通常是 `/api/setting/getCloudUser` 在特定条件下返回2FA质询时，或类似场景。成功登录后会返回新的用户状态和认证信息。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| token | string | 必需。2FA 登录流程中的临时令牌。 |
| code | string | 必需。用户提供的 2FA 验证码。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 成功时返回包含用户认证信息和状态的对象。具体结构依赖于 `model.Login2fa` 的返回，通常可能包含新的 session token, 用户昵称, 邮箱等。失败时此字段可能为 null。 |

请求示例

成功返回示例

失败返回示例

### 请求示例

```
POST /api/setting/login2faCloudUser HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
    "token": "your_2fa_session_token_here",
    "code": "123456"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
      "userNick": "用户昵称",
      "userEmail": "user@example.com",
      "userAvatarURL": "url_to_avatar",
      "userSiYuanPro": true,
      "userPerm": 0, 
      "userSpace": 10737418240,
      "userUsedSpace": 102400,
      "loggedIn": true,
      "token": "new_permanent_auth_token_if_applicable"
  }
}
```

### 失败返回示例

```
{
  "code": -1,
  "msg": "Invalid 2FA code or token.",
  "data": null
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
