---
title: 检查激活码状态 (checkActivationcode)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 检查激活码状态

## 端点

`/api/account/checkActivationcode`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/account.go#L55 "查看 checkActivationcode 接口的源码实现")

## 接口描述

此 API 端点 `POST /api/account/checkActivationcode` 用于检查提供的激活码的状态。

它会调用后端的 `model.CheckActivationcode` 函数来验证激活码的有效性，并返回相应的状态码和消息。验证过程会向思源笔记的云服务器发送请求进行校验。

## 认证与授权

此接口需要满足以下所有条件才能访问:

1. **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token
2. **管理员权限** (`model.CheckAdminRole`): 调用者必须具有管理员角色权限
3. **非只读模式** (`model.CheckReadonly`): 系统不能处于只读模式

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

-   `data` (string, 必需): 需要检查状态的激活码字符串。

注意: 激活码在处理前会:
1. 去除首尾空格
2. 移除无效字符

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 激活码有效; 1: 激活码无效 |
| msg | string | 返回信息，说明激活码的具体状态 |

可能的错误情况:
- 连接云服务器失败
- 请求超时(30秒超时限制)
- HTTP 状态码非 200
- 激活码无效

## 示例

### 请求示例

```json
{
    "data": "YOUR_ACTIVATION_CODE_HERE"
}
```

### 返回示例 (激活码有效)

```json
{
  "code": 0,
  "msg": "激活码有效"
}
```

### 返回示例 (激活码无效)

```json
{
  "code": 1,
  "msg": "激活码无效或不存在"
}
```

### 返回示例 (服务器错误)

```json
{
  "code": 1,
  "msg": "无法连接到云端服务器"
}
```

## 备注

-   此接口用于验证激活码本身的状态，例如是否存在、是否已被使用等，具体结果通过响应的 `code` 和 `msg` 字段来判断。
-   即使激活码无效或已过期，只要请求格式正确且通过了所有权限检查，接口也会返回 HTTP 200 OK，并通过 `msg` 字段告知具体状态。
-   如果权限检查失败(比如未认证、非管理员或系统处于只读模式)，接口会返回相应的错误信息。
-   验证过程依赖云服务器，需要确保网络连接正常且用户已登录(需要用户 token)。

