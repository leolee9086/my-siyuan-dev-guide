---
title: 设置API Token (setAPIToken)
---
# 端点

/api/system/setAPIToken

## 接口描述

此 API 端点 `POST /api/system/setAPIToken` 用于设置或更新思源笔记的 API Token。

API Token 用于通过 HTTP Authorization 头部对其他需要认证的 API 请求进行身份验证。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

-   **`token`** (string, 必需): 新的 API Token 字符串。如果提供一个空字符串 (`""`)，则会清除当前的 API Token，禁用基于 Token 的 API 访问。

**请求示例 (设置新 Token):**

```json
{
    "token": "your_secure_api_token_string"
}
```

**请求示例 (清除 Token):**

```json
{
    "token": ""
}
```

## 响应体

**成功响应 (HTTP 200 OK):**

API Token 成功设置或清除后，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   如果请求体不是有效的 JSON，或者缺少必需的 `token` 字段，将返回类似：
    
    ```json
    {
        "code": -1,
        "msg": "Request body is not valid JSON", // 或 "token is missing"
        "data": null
    }
    ```
    

_注意: 认证失败 (如未提供当前有效的 Token 进行此操作、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。_

## 认证与授权

调用此 API 端点本身需要有效的用户认证 (通过 `Authorization` HTTP头部传递**当前**有效的 API Token，除非是首次设置或之前Token已失效/不存在)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 只有管理员用户才能设置 API Token。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   设置一个新的 API Token 后，旧的 Token (如果存在) 将立即失效。
-   API Token 应被视为敏感信息，妥善保管。
-   如果清空 API Token，所有依赖于此 Token 的 API 调用将无法通过认证。
-   建议使用足够长且随机的字符串作为 API Token。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024-2025 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
