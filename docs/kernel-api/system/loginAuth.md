---
title: 访问授权码登录 (LoginAuth)
---
# 端点

/api/system/loginAuth

## 接口描述

此 API 端点 `POST /api/system/loginAuth` 用于通过用户设置的"访问授权码"进行登录认证。

当思源笔记配置了"访问授权码" (在 `conf.json` 中的 `accessAuthCode` 字段) 后，此接口用于验证用户提交的授权码。在多次尝试失败后，系统可能会要求输入验证码。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

-   **`authCode`** (string, 必需): 用户输入的访问授权码。
-   **`captcha`** (string, 可选): 用户输入的验证码。仅当系统因多次登录失败而要求验证码时 (`util.NeedCaptcha()` 返回 `true`)，此字段才会被处理。

**请求示例:**

```json
{
    "authCode": "your_access_auth_code",
    "captcha": "user_entered_captcha_if_needed"
}
```

如果不需要验证码，可以省略 `captcha` 字段或留空：

```json
{
    "authCode": "your_access_auth_code"
}
```

## 响应体

**成功响应 (HTTP 200 OK):**

授权码正确且验证码（如果需要）也正确时，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

此时，服务器会更新会话状态，标记用户已通过访问授权码认证。

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   **验证码错误/缺失 (当需要时):**
    
    ```json
    {
        "code": 1,
        "msg": "验证码不能为空", // 或 "验证码不正确"
        "data": null
    }
    ```
    
    `code: 1` 是一个特殊状态，通常指示客户端需要处理验证码逻辑（例如，刷新验证码图片或提示用户验证码错误）。
    
-   **访问授权码错误:**
    
    ```json
    {
        "code": -1, // 如果当前不需要验证码
        // 或者
        "code": 1,  // 如果因为此次错误导致开始需要验证码
        "msg": "访问授权码不正确",
        "data": null
    }
    ```
    
-   **访问授权码未设置时的尝试登录 (非预期的直接调用):**
    
    如果系统中并未设置访问授权码 (`conf.System.AccessAuthCode` 为空)，理论上不应调用此接口进行"登录"。但如果调用，根据 `LogoutAuth` 的逻辑推断，可能会收到类似提示授权码未设置的错误，但 \`LoginAuth\` 中未直接体现此场景，通常是授权码为空直接校验失败。
    

_注意: 服务器内部错误 (如会话保存失败) 可能导致 HTTP 500 错误。_

## 认证与授权

此 API 端点本身用于执行"访问授权码"认证流程。它不依赖于 API Token (`Authorization` 头) 或其他登录状态。

调用此接口的目的是建立一个基于访问授权码的会话。

## 备注

-   此接口主要配合思源笔记的"访问授权码"安全设置使用。
-   当用户连续多次输错访问授权码 (由 `util.WrongAuthCount` 计数)，系统会自动启用验证码机制 (`util.NeedCaptcha()` 会返回 `true`)，此时登录时必须同时提供正确的验证码。
-   成功登录后，错误的授权码尝试计数器会清零。
-   验证码图片通过 `/api/system/getCaptcha` 接口获取。

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
