---
title: 重新加载UI (reloadUI)
---
# 端点

/api/system/reloadUI

## 接口描述

此 API 端点 `POST /api/system/reloadUI` 用于触发思源笔记前端用户界面的完全重新加载。

调用此接口后，后端会通过相应的机制 (例如 WebSocket) 通知前端执行刷新操作，效果类似于在浏览器中按下 Ctrl+R 或 F5。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

**成功响应 (HTTP 200 OK):**

API 成功接收请求并已安排UI重新加载（实际重新加载由前端执行），返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应:**

-   如果认证失败 (未提供有效 API Token、非管理员、或处于只读模式)，将返回相应的 HTTP 错误状态码 (如 401, 403) 或标准错误 JSON 结构。

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 只有管理员用户才能调用此接口。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   这是一个具有显著影响的操作，会导致整个前端界面刷新，可能会中断用户当前的操作。
-   通常用于应用某些需要完全刷新才能生效的配置更改，或在开发调试时使用。

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
