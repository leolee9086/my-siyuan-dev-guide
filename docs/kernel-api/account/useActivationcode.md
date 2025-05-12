---
title: 使用激活码 (useActivationcode)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 使用激活码

## 端点

`/api/account/useActivationcode`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/account.go#L37 "查看 useActivationcode 接口的源码实现")

## 接口描述

此 API 端点用于使用激活码激活思源笔记的付费功能。它会向思源笔记的云服务器发送请求来验证并使用激活码。

建议在调用此接口前先使用 `/api/account/checkActivationcode` 接口检查激活码的有效性。

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
| data | string | 是 | 要使用的激活码字符串 |

注意: 激活码在处理前会:
1. 去除首尾空格 (`strings.TrimSpace`)
2. 移除无效字符 (`util.RemoveInvalid`)

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 成功; -1: 失败 |
| msg | string | 返回信息。失败时包含错误信息 |

可能的错误情况:
- 未登录或 token 无效
- 连接云服务器失败
- 激活码无效或已被使用
- HTTP 状态码非 200

## 示例

### 请求示例

```json
POST /api/account/useActivationcode
Content-Type: application/json
Authorization: Token your-token

{
  "data": "YOUR_ACTIVATION_CODE_HERE"
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": ""
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "激活码无效或已被使用"
}
```

### 返回示例 (服务器错误)

```json
{
  "code": -1,
  "msg": "无法连接到云端服务器"
}
```

## 备注

- 需要用户已登录才能使用激活码
- 建议先使用 checkActivationcode 接口检查激活码有效性
- 激活成功后会更新用户的订阅状态
- 需要确保网络连接正常且用户已登录(需要用户 token)
- 建议在调用此接口后刷新用户信息

