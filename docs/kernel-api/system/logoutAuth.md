---
title: 访问授权码登出 (LogoutAuth)
---
# 端点

/api/system/logoutAuth

## 接口描述

此 API 端点 `POST /api/system/logoutAuth` 用于登出通过"访问授权码"认证的用户会话。

如果当前思源笔记设置了"访问授权码" (`conf.System.AccessAuthCode`)，调用此接口会清除当前用户的会话信息，使其需要重新通过 `/api/system/loginAuth` 进行认证。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 或不包含请求体即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

**成功响应 (HTTP 200 OK):**

成功清除会话后，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   **访问授权码未设置:**
    
    如果系统当前并未配置"访问授权码"，则登出操作被视为无效。
    
    ```json
    {
        "code": -1,
        "msg": "请先设置访问授权码", // Conf.Language(86)
        "data": { "closeTimeout": 5000 }
    }
    ```
    
-   **会话保存失败 (内部错误):**
    
    ```json
    {
        "code": -1,
        "msg": "save session failed",
        "data": null
    }
    ```
    

_注意: 一般情况下，即使用户并未通过 `LoginAuth` 登录（例如，通过 API Token 访问），只要设置了访问授权码，调用此接口也会尝试清除会话并返回成功，具体行为是移除 \`workspaceSession\`。_

## 认证与授权

此 API 本身不执行新的认证检查。它作用于当前已建立的会话。

其目的是终止一个基于"访问授权码"的已认证会话。如果用户是通过其他方式（如 API Token）认证的，此接口主要影响通过访问授权码建立的会话状态，对 API Token 的有效性无直接影响。

## 备注

-   此接口用于配合"访问授权码"功能，提供登出机制。
-   如果系统中没有设置"访问授权码"，调用此接口会返回错误，提示用户先设置授权码。
-   成功调用后，用户需要重新通过 `/api/system/loginAuth`（如果配置了授权码）才能再次访问受保护的资源。

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
