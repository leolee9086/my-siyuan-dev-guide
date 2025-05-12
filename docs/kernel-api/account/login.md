---
title: 登录社区账号 (login)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 登录社区账号

## 端点

`/api/account/login`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/account.go#L82 "查看 login 接口的源码实现")

## 接口描述

此 API 端点用于登录思源笔记社区账号。它支持普通登录和两步验证登录。

## 认证与授权

此接口需要满足以下所有条件才能访问:

1. **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token
2. **管理员权限** (`model.CheckAdminRole`): 调用者必须具有管理员角色权限
3. **非只读模式** (`model.CheckReadonly`): 系统不能处于只读模式

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| userName | string | 是 | 用户名(会自动去除首尾空格) |
| userPassword | string | 是 | 密码(需要先进行 MD5 加密) |
| captcha | string | 否 | 验证码(如果需要验证码时必填,会自动去除首尾空格) |
| cloudRegion | number | 是 | 云服务器区域(0: ld246.com, 1: liuyun.io) |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 登录成功; 1: 登录失败; 10: 需要两步验证; -1: 服务器错误 |
| msg | string | 返回信息。失败时包含错误信息 |
| data | object | 返回数据 |

data 字段内容:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| userName | string | 用户名 |
| token | string | 登录令牌(登录成功或需要两步验证时返回) |
| needCaptcha | string | 验证码标识(需要验证码时返回) |

## 示例

### 请求示例 (普通登录)

```json
POST /api/account/login
Content-Type: application/json
Authorization: Token your-token

{
  "userName": "username",
  "userPassword": "e10adc3949ba59abbe56e057f20f883e",
  "captcha": "",
  "cloudRegion": 0
}
```

### 返回示例 (登录成功)

```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "userName": "username",
    "token": "your-login-token"
  }
}
```

### 返回示例 (需要验证码)

```json
{
  "code": 1,
  "msg": "请输入验证码",
  "data": {
    "needCaptcha": "captcha-id"
  }
}
```

### 返回示例 (需要两步验证)

```json
{
  "code": 10,
  "msg": "请输入两步验证码",
  "data": {
    "token": "2fa-token"
  }
}
```

### 返回示例 (登录失败)

```json
{
  "code": 1,
  "msg": "用户名或密码错误"
}
```

## 备注

- 密码必须先进行 MD5 加密后再传输
- 如果开启了验证码,需要先获取验证码图片,验证码图片地址为: `{cloud-server}/captcha/login?needCaptcha={needCaptcha}`
- 如果需要两步验证,需要调用 `/api/setting/login2faCloudUser` 接口完成验证
- 登录成功后需要调用 `/api/setting/getCloudUser` 获取用户信息
- 建议在登录前清除之前的登录状态
