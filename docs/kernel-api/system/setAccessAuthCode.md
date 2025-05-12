---
title: 设置访问授权码 (setAccessAuthCode)
---
# 端点

/api/system/setAccessAuthCode

## 接口描述

此 API 端点 `POST /api/system/setAccessAuthCode` 用于设置或更新思源笔记的"访问授权码"。

访问授权码用于在没有 API Token 的情况下，通过一个独立的密码来保护对思源笔记的访问 (通过 `/api/system/loginAuth` 接口登录)。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

-   **`accessAuthCode`** (string, 必需): 新的访问授权码字符串。
    -   如果提供一个空字符串 (`""`)，则会清除当前的访问授权码，禁用基于授权码的登录。
    -   如果在前端UI中并未修改此项，前端可能会提交一个固定的掩码字符串 (如 `******`，具体值由 `model.MaskedAccessAuthCode` 定义)。在这种情况下，后端会识别此掩码并保持现有的授权码不变。

**请求示例 (设置新授权码):**

```json
{
    "accessAuthCode": "your_strong_auth_code"
}
```

**请求示例 (清除授权码):**

```json
{
    "accessAuthCode": ""
}
```

**请求示例 (从UI提交未修改的授权码，假设掩码为"\*\*\*\*\*\*"):**

```json
{
    "accessAuthCode": "******"
}
```

## 响应体

**成功响应 (HTTP 200 OK):**

访问授权码成功设置、更新或按掩码规则保持不变后，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

成功操作后，后端还会异步延迟约 200 毫秒后触发UI重新加载。

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   如果请求体不是有效的 JSON，或者缺少必需的 `accessAuthCode` 字段，将返回类似：
    
    ```json
    {
        "code": -1,
        "msg": "Request body is not valid JSON", // 或 "accessAuthCode is missing"
        "data": null
    }
    ```
    

_注意: 认证失败 (如未提供当前有效的 API Token 进行此操作、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。_

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 只有管理员用户才能设置访问授权码。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   设置或更改访问授权码后，当前的会话也会同步更新此授权码。
-   为了使更改在前端完全生效，操作成功后后端会安排一个轻微延迟的 UI 重新加载。
-   访问授权码在保存到配置前会进行清理 (去除首尾空格和无效字符)。
-   如果清空访问授权码，则 `/api/system/loginAuth` 接口将无法用于登录。
-   `model.MaskedAccessAuthCode` 的具体值是 `******`。

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
