---
title: 开始免费试用(startFreeTrial)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 开始免费试用

## 端点

`/api/account/startFreeTrial`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/account.go#L27 "查看 startFreeTrial 接口的源码实现")

## 接口描述

此 API 端点用于开始思源笔记的免费试用订阅。它会向思源笔记的云服务器发送请求来激活免费试用。

## 认证与授权

此接口需要满足以下所有条件才能访问:

1. **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token
2. **管理员权限** (`model.CheckAdminRole`): 调用者必须具有管理员角色权限
3. **非只读模式** (`model.CheckReadonly`): 系统不能处于只读模式

## 请求方法

POST

## 请求参数

此接口不需要请求参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 成功; -1: 失败 |
| msg | string | 返回信息。失败时包含错误信息 |

可能的错误情况:
- 未登录
- 连接云服务器失败
- 云服务器返回错误

## 示例

### 请求示例

```json
POST /api/account/startFreeTrial
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": ""
}
```

### 返回示例 (未登录)

```json
{
  "code": -1,
  "msg": "未登录"
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

- 需要用户已登录才能开始免费试用
- 免费试用开始后会更新用户的订阅状态
- 需要确保网络连接正常且用户已登录(需要用户 token)
- 建议在调用此接口后刷新用户信息
