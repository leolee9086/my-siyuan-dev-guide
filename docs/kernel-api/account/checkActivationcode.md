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

它会调用后端的 `model.CheckActivationcode` 函数来验证激活码的有效性，并返回相应的状态码和消息。

## 认证与授权

调用此 API 端点需要有效的用户认证，并通过 `Authorization` HTTP 头部传递 API Token。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`)**

_注意：此接口受 `model.CheckReadonly` 中间件的限制，可能无法在只读模式下成功调用，即使其本身可能不直接修改数据。_

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

-   `data` (string, 必需): 需要检查状态的激活码字符串。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回的具体数据 (通常为空对象 `{}`，具体信息通过 `code` 和 `msg` 反映) |

## 示例

### 请求示例

```json
{
    "data": "YOUR_ACTIVATION_CODE_HERE"
}
```

### 返回示例 (成功检查，激活码有效或无效，具体看msg)

```json
{
  "code": 0,
  "msg": "具体的激活码状态信息，例如 '激活码有效' 或 '激活码不存在'",
  "data": {}
}
```

## 备注

-   此接口用于验证激活码本身的状态，例如是否存在、是否已被使用等，具体结果通过响应的 `code` 和 `msg` 字段来判断。
-   即使激活码无效或已过期，只要请求格式正确且通过认证授权，接口通常也会返回 HTTP 200 OK，并通过 `msg` 字段告知具体状态。

